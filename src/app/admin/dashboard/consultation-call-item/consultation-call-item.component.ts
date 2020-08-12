import { Component, Input, OnInit } from '@angular/core';
import { Schedule, ScheduleType } from '../../../core/models/schedule';

@Component({
  selector: 'job-hub-consultation-call-item',
  templateUrl: './consultation-call-item.component.html',
  styleUrls: ['./consultation-call-item.component.scss']
})
export class ConsultationCallItemComponent implements OnInit {

  @Input() schedule: Schedule;

  ScheduleType = ScheduleType;

  constructor() { }

  ngOnInit(): void {
  }

}
