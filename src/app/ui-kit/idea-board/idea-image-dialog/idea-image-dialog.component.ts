import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Idea } from '../../../core/models/idea-board';

@Component({
  selector: 'job-hub-idea-image-dialog',
  templateUrl: './idea-image-dialog.component.html',
  styleUrls: ['./idea-image-dialog.component.scss']
})
export class IdeaImageDialogComponent implements OnInit {

  ideas: Idea[];
  current: Idea;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {ideas: Idea[], current: Idea}
  ) { }

  ngOnInit(): void {
    this.ideas = this.data.ideas;
    this.current = this.data.current;
  }

}
