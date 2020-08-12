import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'job-hub-inlays-and-borders',
  templateUrl: './inlays-and-borders.component.html',
  styleUrls: ['./inlays-and-borders.component.scss']
})
export class InlaysAndBordersComponent implements OnInit {

  isLoading = false;
  ideas = [
    [
      { url: 'assets/images/landing-page/services/inlay-and-borders/1.jpg', flex: 2 },
      { url: 'assets/images/landing-page/services/inlay-and-borders/2.jpg', flex: 1 },
    ],
    [
      { url: 'assets/images/landing-page/services/inlay-and-borders/3.jpg', flex: 1 },
      { url: 'assets/images/landing-page/services/inlay-and-borders/4.jpg', flex: 1 },
      { url: 'assets/images/landing-page/services/inlay-and-borders/5.jpg', flex: 1 },
    ],
    [
      { url: 'assets/images/landing-page/services/inlay-and-borders/6.jpg', flex: 1 },
      { url: 'assets/images/landing-page/services/inlay-and-borders/7.jpg', flex: 2 },
    ]
  ];

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
