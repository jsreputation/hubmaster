import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES } from '../../core/data/routes';

@Component({
  selector: 'job-hub-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {

  ROUTES = ROUTES;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  navigateToProjectDetail(id: string) {
    this.router.navigate([ROUTES.app.root, ROUTES.app.project, id]);
  }

}
