import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { ScrollPosition } from '../../../core/data/scroll-pos';

@Component({
  selector: 'job-hub-generic-service-detail',
  templateUrl: './generic-service-detail.component.html',
  styleUrls: ['./generic-service-detail.component.scss']
})
export class GenericServiceDetailComponent implements OnInit {

  title = this.route.snapshot.data.title;
  description = this.route.snapshot.data.description;
  hasBeforeAfter = this.route.snapshot.data.hasBeforeAfter;
  moreLink = this.route.snapshot.data.moreLink;

  ideas: any[] = this.route.snapshot.data.ideas;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scrollToService: ScrollToService
  ) { }

  ngOnInit(): void {
  }

  navigateToIdeaBoard() {
    this.router.navigateByUrl(this.moreLink).then(() => {
      this.scrollToService.scrollTo({ target: ScrollPosition.Root });
    });
  }

}
