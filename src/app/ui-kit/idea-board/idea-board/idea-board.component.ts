import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { animate, style } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { NgxMasonryComponent } from 'ngx-masonry';

import { Idea } from '../../../core/models/idea-board';
import { IdeaImageDialogComponent } from '../idea-image-dialog/idea-image-dialog.component';

@Component({
  selector: 'job-hub-idea-board',
  templateUrl: './idea-board.component.html',
  styleUrls: ['./idea-board.component.scss']
})
export class IdeaBoardComponent implements OnInit {

  @Input() ideas: Idea[] = [];
  @Input() gutter = 20;
  @Input() col = 4;
  @Input() editable: boolean;
  @Input() selectable: boolean;
  @Input() clickable: boolean;
  @Input() isCustomer: boolean;
  @Output() edit: EventEmitter<Idea> = new EventEmitter<Idea>();
  @Output() delete: EventEmitter<Idea> = new EventEmitter<Idea>();
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

  loaded = 0;
  cardWidth;

  animations = {
    show: [
      style({opacity: 0, 'z-index': -1}),
      animate('400ms ease-in', style({opacity: 1, 'z-index': 1})),
    ],
    hide: [
      style({opacity: '*', 'z-index': 1}),
      animate('400ms ease-in', style({opacity: 0, 'z-index': -1})),
    ]
  };

  get hasPending(): boolean {
    return this.ideas.length > 0 && Boolean(this.loaded < this.ideas.length);
  }

  constructor(
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cardWidth = this.sanitizer.bypassSecurityTrustStyle(`calc((100% - ${(this.col - 1) * this.gutter}px) / ${this.col}`);
  }

  layoutCompleted(e) {
    if (this.loaded > this.ideas.length) {
      this.loaded = this.ideas.length;
      return;
    }
    if (e && e.length === 1) {
      this.loaded++;
    }
  }

  reset() {
    this.masonry.reloadItems();
    this.masonry.layout();
  }

  view(idea: Idea) {
    this.dialog.open(IdeaImageDialogComponent, {
      width: '965px',
      panelClass: 'bg-black',
      data: {ideas: this.ideas, current: idea}
    });
  }
}
