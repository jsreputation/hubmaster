import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Customer } from '../../../core/models/auth';

@Component({
  selector: 'job-hub-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.scss']
})
export class CustomerAccountComponent implements OnInit {

  user: Customer = this.route.parent.snapshot.data.user;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }

}
