import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ROUTES } from '../../core/data/routes';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../../core/models/auth';

@Component({
  selector: 'job-hub-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  options = [];

  form: FormGroup = this.fb.group({
    contractorId: null
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    if (this.authService.user.role === UserRole.Contractor) {
      this.options = [
        { value: null, label: 'All' },
        { value: this.authService.user.id, label: 'Assigned to me' },
      ];
    } else if (this.authService.user.role === UserRole.SuperAdmin) {
      this.options = [
        { value: null, label: 'All' },
        ...this.route.snapshot.data.contractors.map(x => ({
          value: x.id, label: x.firstName + ' ' + x.lastName
        }))
      ];
    }
  }

  navigateToProjectDetail(id: string) {
    this.router.navigate([ROUTES.admin.root, ROUTES.admin.projects, id]);
  }
}
