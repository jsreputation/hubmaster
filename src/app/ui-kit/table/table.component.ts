import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { TableColumn } from '../../core/models/table';
import { PageSizeDefault } from '../../core/models/paginator';

@Component({
  selector: 'job-hub-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() pageSize = PageSizeDefault;
  @Input() length = 0;
  @Input() columns: TableColumn[] = [];
  @Input() rows: any[] = [];
  @Input() loading: boolean;
  @Input() emptyDescription = `No items to display.`;
  @Output() page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
  }

  ngOnInit(): void {
  }

}
