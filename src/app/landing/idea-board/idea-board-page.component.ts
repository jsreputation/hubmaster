import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IdeaBoardService } from '../../core/services/idea-board.service';
import { Idea } from '../../core/models/idea-board';
import { CustomerSignupWizardService } from '../../core/services/customer-signup-wizard.service';
import { enumToOptions } from '../../core/utils/enum.util';
import { AvailableProjectAccessoryType, ProjectAccessoryType } from '../../core/models/project';
import { ScrollPosition } from '../../core/data/scroll-pos';

@Component({
  selector: 'job-hub-idea-board-page',
  templateUrl: './idea-board-page.component.html',
  styleUrls: ['./idea-board-page.component.scss']
})
export class IdeaBoardPageComponent implements OnInit, OnDestroy {

  blockCount = 1;
  blocks: Idea[][] = [];
  isLoading = false;
  availableProjectAccessoryTypes = [{label: 'All', value: null}, ...enumToOptions<ProjectAccessoryType>(AvailableProjectAccessoryType)];
  ScrollPosition = ScrollPosition;
  form: FormGroup = this.fb.group({
    projectType: null
  });

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private ideaBoardService: IdeaBoardService,
    private customerSignupWizardService: CustomerSignupWizardService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadIdeas();
    this.form.get('projectType').valueChanges.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(value => {
      this.blocks = [];
      this.blockCount = 1;
      setTimeout(() => {
        this.loadIdeas();
      }, 100);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  loadMore() {
    this.blockCount += 1;
    this.loadIdeas();
  }

  cardLiked(e) {
    let ideas = [];
    this.blocks.forEach(block => {
      const ids = block.filter(x => x.selected).map(x => x.id);
      ideas = [...ideas, ...ids];
    });
    this.customerSignupWizardService.saveToStorage({ ideas });
  }

  private async loadIdeas() {
    try {
      this.isLoading = true;
      const ideas = await this.ideaBoardService.getIdeasByBlock(this.blockCount, this.form.value.projectType).toPromise();
      const newItems = ideas.slice((this.blockCount - 1) * 6, this.blockCount * 6);
      this.blocks.push(newItems);
      const ids = this.customerSignupWizardService.getFromStorage('ideas') || [];
      this.blocks.forEach(block => {
        block.forEach(item => {
          item.selected = Boolean(ids.find(id => id === item.id));
        });
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

}
