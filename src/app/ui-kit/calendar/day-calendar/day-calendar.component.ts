import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'job-hub-day-calendar',
  templateUrl: './day-calendar.component.html',
  styleUrls: ['./day-calendar.component.scss']
})
export class DayCalendarComponent implements OnInit {

  @Input() events = [];
  @Input() viewDate;

  constructor() { }

  ngOnInit(): void {
  }

}
