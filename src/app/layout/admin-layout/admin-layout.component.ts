import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AdminLayoutService } from './admin-layout.service';
import { ROUTES } from '../../core/data/routes';
import { ScrollPosition } from '../../core/data/scroll-pos';

@Component({
  selector: 'job-hub-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('admin_panel_container') adminPanelContainer: ElementRef;

  ScrollPosition = ScrollPosition;
  ROUTES = ROUTES;

  constructor(
    private adminLayoutService: AdminLayoutService
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.adminLayoutService.setAdminPanelContainer(this.adminPanelContainer);
  }

}
