import { Component, Input, OnInit } from '@angular/core';

import { Portfolio } from '../../../core/models/portfolio';

@Component({
  selector: 'job-hub-portfolio-project-on-contract',
  templateUrl: './portfolio-project-on-contract.component.html',
  styleUrls: ['./portfolio-project-on-contract.component.scss']
})
export class PortfolioProjectOnContractComponent implements OnInit {

  @Input() project: Portfolio;

  constructor() { }

  ngOnInit(): void {
  }

}
