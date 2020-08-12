import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../../../core/data/routes';

@Component({
  selector: 'job-hub-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

  registrationImages = [
    'assets/images/landing-page/why-choose-us/project-management/register-1.jpg',
    'assets/images/landing-page/why-choose-us/project-management/register-2.jpg',
    'assets/images/landing-page/why-choose-us/project-management/register-3.jpg',
  ];

  estimateImages = [
    'assets/images/landing-page/why-choose-us/project-management/estimate-1.jpg',
    'assets/images/landing-page/why-choose-us/project-management/estimate-2.jpg',
    'assets/images/landing-page/why-choose-us/project-management/estimate-3.jpg',
  ];

  managementImages = [
    'assets/images/landing-page/why-choose-us/project-management/management-1.jpg',
    'assets/images/landing-page/why-choose-us/project-management/management-2.jpg',
    'assets/images/landing-page/why-choose-us/project-management/management-3.jpg',
  ];

  ROUTES = ROUTES;

  constructor() { }

  ngOnInit(): void {
  }

}
