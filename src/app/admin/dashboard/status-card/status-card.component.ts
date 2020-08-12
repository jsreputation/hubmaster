import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'job-hub-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss']
})
export class StatusCardComponent implements OnInit {

  @Input() image: string;
  @Input() value;
  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
