import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ROUTES } from '../../../core/data/routes';
import { ProjectDetailStateService } from '../../../shared/project-detail-state/project-detail-state.service';
import { ToastrService } from '../../../core/services/toastr.service';
import { PaymentService } from '../../../core/services/payment.service';
import { AlertService } from '../../../ui-kit/alert/alert.service';
import { EditMilestoneType, Milestone } from '../../../core/models/project';
import { EditMilestoneDialogComponent } from './edit-milestone-dialog/edit-milestone-dialog.component';
import { MakeRefundDialogComponent } from './make-refund-dialog/make-refund-dialog.component';

@Component({
  selector: 'job-hub-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit, OnDestroy {

  isLoading = false;

  milestones = this.route.snapshot.data.milestones;
  project = this.projectDetailStateService.project;
  ROUTES = ROUTES;
  private unsubscribeAll$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private projectDetailStateService: ProjectDetailStateService,
    private toastr: ToastrService,
    private paymentService: PaymentService,
    private alert: AlertService,
  ) {
  }

  ngOnInit(): void {
  }

  async requestPayment(milestone) {
    try {
      this.isLoading = true;
      const newMilestone = await this.paymentService.requestPayment(milestone.id).toPromise();
      const found = this.milestones.find(m => m.id === milestone.id);
      found.status = newMilestone.status;
    } catch (e) {
      this.toastr.error(e, 'Failed to request release the milestone. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  async requestReview(milestone) {
    try {
      this.isLoading = true;
      await this.paymentService.requestReview(milestone.project.id).toPromise();
      this.toastr.info('Notification is sent to the customer.');
    } catch (e) {
      this.toastr.error(e, 'Failed to request a review. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  async confirmCashPayment(milestone: Milestone) {
    this.alert.yesNo('Payment', 'Are you sure to confirm the cash payment?')
      .pipe(filter(value => value))
      .subscribe(async () => {
        if (milestone.paidDate) {
          this.toastr.warning('The milestone is already paid.');
          return;
        }
        try {
          this.isLoading = true;
          const res = await this.paymentService.confirmCashPay(milestone.id).toPromise();
          milestone.paidDate = res.paidDate;
        } catch (e) {
          this.toastr.error(e, 'Failed to confirm the cash payment.');
        } finally {
          this.isLoading = false;
        }
      });
  }

  async removeAddOn(addOnId: string) {
    this.alert.yesNo('Remove', 'Are you sure to remove the add on?')
      .pipe(filter(value => value))
      .subscribe(async () => {
        try {
          this.isLoading = true;
          await this.paymentService.requestRemoveAddOn(addOnId).toPromise();
          const iFound = this.project.paymentAddOns.findIndex(addOn => addOn.id === addOnId);
          this.project.paymentAddOns.splice(iFound, 1);
        } catch (e) {
          console.log(e);
          this.toastr.error(e, 'Failed to remove the add on.');
        } finally {
          this.isLoading = false;
        }
      });
  }

  async editMilestone(milestone: Milestone) {
    const dialogRef = this.dialog.open(EditMilestoneDialogComponent, {
      width: '460px',
      closeOnNavigation: true,
      data: milestone
    });
    dialogRef.afterClosed().pipe(filter(data => data))
      .subscribe(data => {
        const [editType, payload] = data as any;
        if (editType === EditMilestoneType.CashPayment) {
          this.milestones[2].amount = payload.amount;
          this.milestones[2].comment = payload.comment;
        } else if (editType === EditMilestoneType.AddOn) {
          this.project.paymentAddOns.push(payload);
        } else if (editType === EditMilestoneType.Refund) {
          this.project.refund = payload;
        }
      });
  }

  makeRefund($event) {
    const dialogRef = this.dialog.open(MakeRefundDialogComponent, {
      width: '460px',
      closeOnNavigation: true,
    });
    dialogRef.afterClosed().pipe(filter(data => data))
      .subscribe(data => {
        // TODO: add after make refund dialog close handler
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next(null);
    this.unsubscribeAll$.complete();
  }
}
