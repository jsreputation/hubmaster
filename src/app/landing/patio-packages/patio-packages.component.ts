import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { patioPackageCards } from '../../core/data/patio-packages';
import { PatioPackage } from '../../core/models/patio-package';
import { ScrollPosition } from '../../core/data/scroll-pos';

@Component({
  selector: 'job-hub-patio-packages',
  templateUrl: './patio-packages.component.html',
  styleUrls: ['./patio-packages.component.scss']
})
export class PatioPackagesComponent implements OnInit {

  patioPackageCards = patioPackageCards;
  ScrollPosition = ScrollPosition;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scrollToService: ScrollToService
  ) { }

  ngOnInit(): void {
  }

  navigateTo(id: PatioPackage) {
    this.scrollToService.scrollTo({ target: ScrollPosition.PatioPackageContent });
    this.router.navigate([id], {relativeTo: this.route});
  }

}
