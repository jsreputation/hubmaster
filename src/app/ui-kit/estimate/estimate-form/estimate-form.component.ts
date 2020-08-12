import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Estimate, EstimateItem, EstimateStatus } from '../../../core/models/estimate';
import { Project, projectOptions } from '../../../core/models/project';
import { Option } from '../../../core/models/option';
import { User } from '../../../core/models/auth';
import { projectGeneralForm } from '../../../core/data/form-labels';

@Component({
  selector: 'job-hub-estimate-form',
  templateUrl: './estimate-form.component.html',
  styleUrls: ['./estimate-form.component.scss']
})
export class EstimateFormComponent implements OnInit, OnDestroy {

  @Input() project: Project;
  @Input() estimate: Estimate;
  @Input() renderSchedules;
  @Input() readonly;
  @Input() small;
  @Input() contractors;
  @Input() assignable: boolean;
  @Input() showStatus = true;
  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() createFinalProposal: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  prefix = projectGeneralForm.prefix;

  EstimateStatus = EstimateStatus;
  projectOptions = projectOptions;
  contractorOptions: Option<User>[];
  private unsubscribeAll$: Subject<any> = new Subject<any>();

  constructor(
    private fb: FormBuilder,
  ) {
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  ngOnInit(): void {
    this.contractorOptions = Boolean(this.contractors) ? this.contractors.map(contractor => ({
      value: contractor.id,
      label: `${contractor.firstName} ${contractor.lastName}`
    })) : [];
    this.form = this.buildEstimateForm(this.estimate);
    this.formChange.emit(this.form);
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribeAll$)
    ).subscribe(() => {
      this.formChange.emit(this.form);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

  private buildEstimateForm(estimate?: Estimate) {
    const data: Estimate = estimate || {} as any;
    return this.fb.group({
      siteVisitSchedules: [estimate.siteVisitSchedules || []],
      projectType: [estimate.projectType || '', Validators.required],
      materials: [estimate.materials || [], Validators.required],
      locationType: [estimate.locationType || '', Validators.required],
      groundState: [estimate.groundState || '', Validators.required],
      projectSize: [estimate.projectSize || '', Validators.required],
      shapeType: [estimate.shapeType || '', Validators.required],
      coreProjectComment: [estimate.coreProjectComment || '', Validators.required],
      costUnit: [estimate.costUnit || '', Validators.required],
      pricePerUnit: [estimate.pricePerUnit || '', [Validators.required, Validators.min(1)]],
      requestDetails: [estimate.requestDetails || ''],
      items: this.fb.array(data.items ? data.items.map(x => this.buildEstimateItemForm(x)) : []),
      comment: [data.comment || '', Validators.required],
      timelineType: [data.timelineType || '', Validators.required],
      contractorUserId: [(this.project.assignedContractor && this.project.assignedContractor.id) || '']
    });
  }

  private buildEstimateItemForm(estimateItem?: EstimateItem) {
    const data = estimateItem || {} as any;
    return this.fb.group({
      id: '',
      type: [data.type || '', Validators.required],
      materials: [data.materials || [], Validators.required],
      locationType: [data.locationType || '', Validators.required],
      costUnit: [data.costUnit || '', Validators.required],
      pricePerUnit: [data.pricePerUnit || '', [Validators.required, Validators.min(1)]],
      size: data.size || '',
      comment: data.comment || '',
    });
  }
}
