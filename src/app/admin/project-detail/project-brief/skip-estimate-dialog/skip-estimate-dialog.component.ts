import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProjectDetailStateService } from '../../../../shared/project-detail-state/project-detail-state.service';
import { ToastrService } from '../../../../core/services/toastr.service';
import { ProjectService } from '../../../../core/services/project.service';
import { Option } from '../../../../core/models/option';
import { User } from '../../../../core/models/auth';

@Component({
  selector: 'job-hub-skip-estimate-dialog',
  templateUrl: './skip-estimate-dialog.component.html',
  styleUrls: ['./skip-estimate-dialog.component.scss']
})
export class SkipEstimateDialogComponent implements OnInit {

  isSaving = false;

  form: FormGroup = this.fb.group({
    contractorUserId: ['', Validators.required],
    siteVisitDate: ['', Validators.required]
  });

  contractorOptions: Option<User>[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SkipEstimateDialogComponent>,
    private projectDetailStateService: ProjectDetailStateService,
    private projectService: ProjectService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.contractorOptions = Boolean(this.data.contractors) ? this.data.contractors.map(contractor => ({
      value: contractor.id,
      label: `${contractor.firstName} ${contractor.lastName}`
    })) : [];
  }

  async skipEstimate() {
    const projectId = this.projectDetailStateService.project.id;
    try {
      this.isSaving = true;
      const project = await this.projectService.skipEstimate(projectId, this.form.value.contractorUserId, this.form.value.siteVisitDate).toPromise();
      this.dialogRef.close(project);
    } catch (e) {
      this.toastr.error(e, 'Failed to skip estimate step.');
    } finally {
      this.isSaving = false;
    }
  }

}
