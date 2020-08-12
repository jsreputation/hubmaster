import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { projectOptions } from '../../../core/models/project';
import { FinalProposal, FinalProposalItem, FinalProposalStatus } from '../../../core/models/final-proposal';
import { taxRate } from '../../../core/data/consts';
import { CommonService } from '../../../core/services/common.service';
import { projectGeneralForm } from '../../../core/data/form-labels';
import { ScrollPosition } from '../../../core/data/scroll-pos';

@Component({
  selector: 'job-hub-proposal-form',
  templateUrl: './proposal-form.component.html',
  styleUrls: ['./proposal-form.component.scss']
})
export class ProposalFormComponent implements OnInit, OnDestroy {

  @Input() proposal: FinalProposal;
  @Input() small: boolean;
  @Input() readonly = false;
  @Input() lock = false;
  @Output() createFinalProposal = new EventEmitter<any>();
  @Output() proposalChange = new EventEmitter<FinalProposal>();

  subTotal = 0;
  tax = 0;
  total = 0;

  discount = 0;

  form: FormGroup;

  projectOptions = projectOptions;
  prefix = projectGeneralForm.prefix;

  private unsubscribeAll$ = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService
  ) {
  }

  get proposalItems(): FormArray {
    return this.form.get('items') as FormArray;
  }

  ngOnInit(): void {
    this.form = this.buildProposalForm(this.proposal);
    this.discount = this.proposal.discount || 0;
    this.refreshPrice(this.proposal);
    this.form.valueChanges.pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(value => {
        this.proposalChange.emit(value);
        this.refreshPrice(value);
      });
  }

  refreshPrice(proposal: FinalProposal) {
    let subTotal = 0;
    proposal.items.forEach(item => {
      if (item.accept || !proposal.id) {
        subTotal += +item.price;
      }
    });
    subTotal += +proposal.price;
    this.subTotal = subTotal;
    this.tax = (subTotal - this.discount) * taxRate;
    this.total = this.subTotal + this.tax - this.discount;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next(null);
    this.unsubscribeAll$.complete();
  }

  deleteAccessory(i: number) {
    this.proposalItems.removeAt(i);
  }

  sendProposal() {
    if (this.form.invalid) {
      this.commonService.findInvalidField(this.form, projectGeneralForm, projectGeneralForm.prefix, ScrollPosition.AdminPanelContainer);
      return;
    }
    const payload = this.form.value;
    payload.discount = this.discount;
    this.createFinalProposal.emit(payload);
  }

  lockToggles() {
    this.proposalItems.controls.forEach(item => {
      item.get('accept').disable();
    });
  }

  buildProposalForm(proposal?: FinalProposal) {
    const data: FinalProposal = proposal || {} as any;
    return this.fb.group({
      items: this.fb.array(data.items ? data.items.map(x => this.buildProposalItemForm(x)) : []),
      id: [data.id || ''],
      attachments: [data.attachments || []],
      comment: data.comment || '',
      projectType: [data.projectType || '', Validators.required],
      materials: [data.materials || [], Validators.required],
      locationType: [data.locationType || '', Validators.required],
      groundState: data.groundState || '',
      projectSize: data.projectSize || '',
      shapeType: [data.shapeType || '', Validators.required],
      requestDetails: data.requestDetails || '',
      coreProjectComment: data.coreProjectComment || '',
      price: [data.price || '', Validators.required],
      estimateCompleteDays: [data.estimateCompleteDays || undefined, Validators.required],
      startDate: [data.startDate || null, Validators.required],
      endDate: [data.endDate || null, Validators.required],
      warrantyWorkmanShip: [data.warrantyWorkmanShip || null, Validators.required],
      status: data.status || '',
    });
  }

  private buildProposalItemForm(proposalItem?: FinalProposalItem) {
    const data = proposalItem || {} as any;
    return this.fb.group({
      id: data.id || '',
      type: [data.type || '', Validators.required],
      accept: [{ value: data.accept, disabled: !this.small || this.proposal.status !== FinalProposalStatus.Pending || this.lock }],
      materials: [data.materials || [], Validators.required],
      manufacturer: [data.manufacturer || ''],
      productName: [data.productName || ''],
      preferredColors: [data.preferredColors || []],
      size: data.size || '',
      comment: data.comment || '',
      price: [data.price || '', Validators.required]
    });
  }
}
