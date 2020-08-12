import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { pastProjects, referenceProjects } from '../../core/data/portfolio';
import { ProjectDetail } from '../../core/models/project';
import { AccessoryLayout, Contract, CostEstimate } from '../../core/models/contract';
import { enumToLabel } from '../../core/utils/enum.util';
import { contractForm } from '../../core/data/form-labels';

@Component({
  selector: 'job-hub-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  @Input() readonly = false;
  @Input() project: ProjectDetail;
  @Input() contract: Contract;

  prefix = contractForm.prefix;
  pastProjects = pastProjects;
  referenceProjects = referenceProjects;
  categories: string[] = [];
  subTotal = 0;
  accessoryOptions = [];

  form: FormGroup;

  get layouts(): FormArray {
    return this.form.get('layouts') as FormArray;
  }

  get costEstimates(): FormArray {
    return this.form.get('costEstimates') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.categories = this.contract.layouts.map(x => enumToLabel(x.type));
    this.subTotal = this.project.finalProposal.items.reduce((sum, item) => sum += item.price, 0) + this.project.finalProposal.price;
    this.initContractForm();
    this.accessoryOptions = this.project.finalProposal.items.filter(x => x.accept).map(x => ({
      value: x.id, label: enumToLabel(x.type)
    }));
  }

  addEstimate() {
    this.costEstimates.push(this.buildEstimateForm());
  }

  saveEstimates() {
    this.costEstimates.controls.forEach(x => x.get('isEditing').setValue(false));
  }

  private initContractForm() {
    const data = this.contract;
    this.form = this.fb.group({
      existingSiteAssessment: [data.existingSiteAssessment || '', Validators.required],
      existingMaterialsRemoval: [data.existingMaterialsRemoval || '', Validators.required],
      paversSize: [data.paversSize || '', Validators.required],
      paversColor: [data.paversColor || '', Validators.required],
      paversQuality: [data.paversQuality || '', Validators.required],
      workPlan: [data.workPlan || '', Validators.required],
      attachments: [data.attachments || []],
      costEstimates: this.fb.array(data.costEstimates.map(x => this.buildEstimateForm(x))),
      layouts: this.fb.array(data.layouts.map(x => this.buildLayoutForm(x)))
    });
  }

  private buildLayoutForm(layout: AccessoryLayout) {
    return this.fb.group({
      id: layout.id,
      type: [layout.type, Validators.required],
      comment: [layout.comment, Validators.required],
    });
  }

  private buildEstimateForm(estimate?: CostEstimate) {
    const data = estimate || {} as any;
    return this.fb.group({
      id: data.id,
      comment: [data.comment || '', Validators.required],
      price: [data.price || 0, [Validators.min(0), Validators.max(this.subTotal)]],
      accessories: [data.accessories || [], Validators.required],
      isEditing: true
    });
  }

}
