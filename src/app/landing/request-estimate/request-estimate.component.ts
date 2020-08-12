import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { ProjectGeneralComponent } from '../../shared/customer-signup-wizard/project-general/project-general.component';
import { PersonalDetailComponent } from '../../shared/customer-signup-wizard/personal-detail/personal-detail.component';
import { ConsultationScheduleComponent } from '../../shared/customer-signup-wizard/consultation-schedule/consultation-schedule.component';
import { CompleteAccountComponent } from '../../shared/customer-signup-wizard/complete-account/complete-account.component';
import { AlertService } from '../../ui-kit/alert/alert.service';
import { IdeaSelectComponent } from '../../shared/customer-signup-wizard/idea-select/idea-select.component';
import { requestEstimate } from '../../core/data/project-create';
import { ToastrService } from '../../core/services/toastr.service';
import { CustomerSignupWizardService } from '../../core/services/customer-signup-wizard.service';
import { areFormControlsValid } from '../../core/utils/form.util';
import { AuthService } from '../../core/services/auth.service';
import { ROUTES } from '../../core/data/routes';
import { ScrollPosition } from '../../core/data/scroll-pos';
import { CommonService } from '../../core/services/common.service';
import { personalDetailForm, projectGeneralForm } from '../../core/data/form-labels';

const footerHeight = 495;
const footerHeightMobile = 495;

@Component({
  selector: 'job-hub-request-estimate',
  templateUrl: './request-estimate.component.html',
  styleUrls: ['./request-estimate.component.scss']
})
export class RequestEstimateComponent implements OnInit, OnDestroy {

  @ViewChild(ProjectGeneralComponent) general: ProjectGeneralComponent;
  @ViewChild(PersonalDetailComponent) person: PersonalDetailComponent;
  @ViewChild(ConsultationScheduleComponent) consultation: ConsultationScheduleComponent;
  @ViewChild(IdeaSelectComponent) idea: IdeaSelectComponent;
  @ViewChild(CompleteAccountComponent) complete: CompleteAccountComponent;

  total = requestEstimate.length;
  step = 1;
  title = '';
  description = '';
  isLoading = false;
  isSticky = true;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentPosition = document.body.offsetHeight - (window.innerHeight + window.scrollY);
    this.isSticky = currentPosition > (window.innerWidth < 768 ? footerHeightMobile : footerHeight);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private customerSignupWizardService: CustomerSignupWizardService,
    private authService: AuthService,
    private alert: AlertService,
    private datePipe: DatePipe,
    private scrollToService: ScrollToService,
    private commonService: CommonService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(queryParams => {
      this.step = Number(queryParams.step) || 1;
      if (this.step > this.total || this.step < 1) { // redirect to root page when query param is invalid format
        this.router.navigate(['.'], {queryParams: null, relativeTo: this.route});
        return;
      }
      if (this.step === 2) {
        this.validateProjectsObject();
      } else if (this.step === 3) {
        this.validateUserObject();
      } else if (this.step === 4) {
        this.validateConsultationObject();
      }
      const data = requestEstimate[this.step - 1];
      this.title = data.title;
      this.description = data.description;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  skip() {
    if (this.step === 4) {
      this.gotoNext();
    }
  }

  back() {
    this.gotoPrevious();
  }

  next() {
    if (this.step === 1) {
      const projectForm = this.general.form.get('projects').get('0') as FormGroup;
      if (projectForm.invalid) {
        this.commonService.findInvalidField(projectForm, projectGeneralForm, projectGeneralForm.prefix);
        return;
      } else {
        this.customerSignupWizardService.saveToStorage(this.general.form.value);
        this.gotoNext();
        return;
      }
    }

    if (this.step === 2) {
      if (this.person.form.get('user').invalid) {
        this.commonService.findInvalidField(this.person.form.get('user') as FormGroup, personalDetailForm, personalDetailForm.prefix);
        return;
      } else {
        this.customerSignupWizardService.saveToStorage(this.person.form.value);
        this.gotoNext();
        return;
      }
    }

    if (this.step === 3) {
      if (this.consultation.form.invalid) {
        this.toastr.warning('Please select the best time for consultation.');
        return;
      } else {
        this.customerSignupWizardService.saveToStorage(this.consultation.form.value);
        this.gotoNext();
        return;
      }
    }

    if (this.step === 4) {
      const ideas = this.idea.ideas.filter(x => x.selected).map(x => x.id);
      this.customerSignupWizardService.saveToStorage({ideas});
      this.gotoNext();
      return;
    }

    if (this.step === 5) {
      this.validateCompleteForm();
      return;
    }
  }

  private validateCompleteForm() {
    const form = this.complete.form.get('user') as FormGroup;
    // check validation of complete form
    if (form.get('terms').invalid) {
      this.toastr.warning('You need to agree to the Terms of Service and Privacy and Policy.');
      return;
    }
    if (!areFormControlsValid(form, ['firstName', 'lastName', 'email', 'phone'])) {
      this.toastr.warning('Some of your personal information are missing. Please check personal information form again.');
      this.step = 2;
      this.navigateToStep();
      return;
    }
    if (!areFormControlsValid(form, ['password', 'confirmPassword'])) {
      this.toastr.warning('Password mismatch. Please type password and confirm password correctly.');
      return;
    }
    // check validation of previous steps
    this.validateProjectsObject();
    this.validateUserObject();
    this.validateConsultationObject();
    this.customerSignupWizardService.saveToStorage(this.complete.form.value);
    this.submit();
  }

  private validateProjectsObject() {
    const projects = this.customerSignupWizardService.getFromStorage('projects');
    if (!projects || !projects.length || !projects[0].name) {
      this.step = 1;
      this.navigateToStep();
      return;
    }
  }

  private validateUserObject() {
    const user = this.customerSignupWizardService.getFromStorage('user');
    if (!user || !user.firstName) {
      this.step = 2;
      this.navigateToStep();
      return;
    }
  }

  private validateConsultationObject() {
    const consultation = this.customerSignupWizardService.getFromStorage('consultation');
    if (!consultation || !consultation.datetime) {
      this.step = 3;
      this.navigateToStep();
      return;
    }
  }

  private navigateToStep() {
    this.router.navigate(['.'], {queryParams: {step: this.step}, relativeTo: this.route}).then(() => {
      this.scrollToService.scrollTo({ target: ScrollPosition.Root });
    });
  }

  private gotoNext() {
    if (this.step < this.total) {
      this.step++;
      this.navigateToStep();
    }
  }

  private gotoPrevious() {
    if (this.step > 1) {
      this.step--;
      this.navigateToStep();
    }
  }

  private async submit() {
    try {
      this.isLoading = true;
      const response = await this.customerSignupWizardService.register().toPromise();
      this.authService.authenticateUser(response.accessToken);
      const firstName = this.customerSignupWizardService.getFromStorage('user').firstName;
      const datetime = this.customerSignupWizardService.getFromStorage('consultation').datetime;
      this.alert.alert(
        `Welcome ${firstName}`,
        `
         <p class="px-30">Your account has successfully been created, we look forward to speaking to you on ${this.datePipe.transform(datetime, 'MMM d, y \' at \' h:mm a')}.</p>
         <p class="px-30">In the mean time, you can continue to get ideas from our <span class="text-primary font-weight-medium">inspiration board</span> and <span class="text-primary font-weight-medium">portfolio project</span> section.</p>
        `
      );
      this.customerSignupWizardService.clearStorage();
      this.router.navigate([ROUTES.app.root, ROUTES.app.myProjects]);
    } catch (e) {
      this.toastr.error(e, 'Sorry, Failed to save your information. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

}
