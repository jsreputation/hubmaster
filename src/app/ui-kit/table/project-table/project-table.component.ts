import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Project } from '../../../core/models/project';
import { TableColumn } from '../../../core/models/table';
import { PageSizeSmall } from '../../../core/models/paginator';
import { ProjectService } from '../../../core/services/project.service';
import { CustomerService } from '../../../core/services/customer.service';
import { TableComponent } from '../table.component';
import { ContractStatus } from '../../../core/models/contract';

@Component({
  selector: 'job-hub-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit, OnDestroy {

  @Input() dateField = 'updatedAt';
  @Input() dateLabel = 'Update';
  @Input() hasCreatorColumn;
  @Input() customerId: string;
  @Input() contractorIdChanged$: Observable<string>;
  @Output() selectProject: EventEmitter<string> = new EventEmitter<string>();
  @Output() page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  @ViewChild(TableComponent) table: TableComponent;
  @ViewChild('imageColumn', {static: true}) imageColumn: TemplateRef<any>;
  @ViewChild('nameColumn', {static: true}) nameColumn: TemplateRef<any>;
  @ViewChild('creatorColumn', {static: true}) creatorColumn: TemplateRef<any>;
  @ViewChild('statusColumn', {static: true}) statusColumn: TemplateRef<any>;
  @ViewChild('contractColumn', {static: true}) contractColumn: TemplateRef<any>;
  @ViewChild('dateColumn', {static: true}) dateColumn: TemplateRef<any>;
  @ViewChild('actionColumn', {static: true}) actionColumn: TemplateRef<any>;

  columns: TableColumn[];
  isLoading = false;
  total = 0;
  skip = 0;
  take = PageSizeSmall;
  projects: Project[] = [];
  contractorId: string = null;

  ContractStatus = ContractStatus;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private projectService: ProjectService,
    private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {
    this.columns = [
      {templateRef: this.imageColumn, width: '60px'},
      {label: 'Project Name', templateRef: this.nameColumn, width: '40%'},
      {label: this.dateLabel, templateRef: this.dateColumn, width: '150px'},
      {label: 'Status', name: '', templateRef: this.statusColumn, width: '15%'},
      {label: 'Contract', name: '', templateRef: this.contractColumn, width: '150px'},
      // {templateRef: this.actionColumn, width: '50px'},
    ];
    if (this.hasCreatorColumn) {
      this.columns.splice(3, 0,
        {label: 'Creator', templateRef: this.creatorColumn, width: '15%'}
      );
    }

    this.loadProjects();

    if (this.contractorIdChanged$) {
      this.contractorIdChanged$.pipe(
        takeUntil(this.unsubscribeAll)
      ).subscribe(value => {
        this.skip = 0;
        this.projects = [];
        this.contractorId = value;
        this.table.paginator.pageIndex = 0;
        this.loadProjects();
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onPage(e: PageEvent) {
    this.take = e.pageSize;
    this.skip = this.take * e.pageIndex;
    this.loadProjects();
  }

  private async loadProjects() {
    try {
      this.isLoading = true;
      let res;
      if (this.customerId) {
        res = await this.customerService.getProjectsByCustomerId(this.customerId, this.skip, this.take).toPromise();
      } else {
        res = await this.projectService.getProjects(this.skip, this.take, this.contractorId).toPromise();
      }
      this.projects = res.data;
      this.total = res.count;
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }
}
