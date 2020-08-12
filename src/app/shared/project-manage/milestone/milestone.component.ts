import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Milestone, MilestoneStatus, Project } from '../../../core/models/project';

@Component({
  selector: 'job-hub-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})
export class MilestoneComponent implements OnInit {

  @Input() milestone: Milestone;
  @Input() isPaying = true; // true for customer side, false for contractor side
  @Input() disableActions;
  @Input() readonly;
  @Input() project: Project;

  @Output() makePayment = new EventEmitter<Milestone>();
  @Output() requestPayment = new EventEmitter<Milestone>();
  @Output() editMilestone = new EventEmitter<Milestone>();
  @Output() confirmCashPayment = new EventEmitter<Milestone>();
  @Output() review = new EventEmitter<Milestone>();
  @Output() makeRefund = new EventEmitter<Project>();
  @Output() removeAddOn = new EventEmitter<string>();

  lastMilestoneOrder =  2; // third milestone must have edit button

  MilestoneStatus = MilestoneStatus;

  constructor() { }

  ngOnInit(): void {
  }

  clickCashToggle($event) {
    $event.preventDefault();
    this.confirmCashPayment.emit(this.milestone);
  }
}
