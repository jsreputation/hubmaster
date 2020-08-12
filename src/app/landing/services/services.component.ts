import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../../core/data/routes';

@Component({
  selector: 'job-hub-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  categories = [
    { name: 'Patios', link: ROUTES.landingPages.services.patios },
    { name: 'Walkways', link: ROUTES.landingPages.services.walkways },
    { name: 'Retaining Walls', link: ROUTES.landingPages.services.retainingWalls },
    { name: 'Driveways', link: ROUTES.landingPages.services.driveways },
    { name: 'Pool Patios', link: ROUTES.landingPages.services.poolPatios },
    { name: 'Complete Transformations', link: ROUTES.landingPages.services.completeTransformations },
    { name: 'Design Services', link: ROUTES.landingPages.services.designServices },
    { name: 'Steps & Staircases', link: ROUTES.landingPages.services.stepsAndStaircases },
    { name: 'Inlays & Borders', link: ROUTES.landingPages.services.inlaysAndBorders },
    { name: 'Pavers VS Concrete', link: ROUTES.landingPages.services.paversVsConcrete }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
