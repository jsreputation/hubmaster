import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { patioPackages } from '../../../core/data/patio-packages';
import { PackageImageViewerComponent } from '../package-image-viewer/package-image-viewer.component';
import { ScheduleConsultationDialogComponent } from '../schedule-consultation-dialog/schedule-consultation-dialog.component';
import { ScrollPosition } from '../../../core/data/scroll-pos';

@Component({
  selector: 'job-hub-package-content',
  templateUrl: './package-content.component.html',
  styleUrls: ['./package-content.component.scss']
})
export class PackageContentComponent implements OnInit, OnDestroy {

  @ViewChild(PackageImageViewerComponent) packageImageViewer: PackageImageViewerComponent;

  data: any = {};
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private scrollToService: ScrollToService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((value: any) => {
      this.data = patioPackages[value.id];
      if (this.packageImageViewer) {
        this.packageImageViewer.reset();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  schedule() {
    this.scrollToService.scrollTo({ target: ScrollPosition.Root, duration: 300 });
    setTimeout(() => {
      this.dialog.open(ScheduleConsultationDialogComponent, {
        width: '765px',
        data: this.route.snapshot.params.id
      });
    }, 300);
  }

}
