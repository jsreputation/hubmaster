import { Component, OnInit, ViewChild } from '@angular/core';

import { IdeaBoardService } from '../../../core/services/idea-board.service';
import { Option } from '../../../core/models/option';
import { ProjectAccessoryType } from '../../../core/models/project';
import { Idea } from '../../../core/models/idea-board';
import { IdeaBoardComponent } from '../../../ui-kit/idea-board/idea-board/idea-board.component';
import { CustomerSignupWizardService } from '../../../core/services/customer-signup-wizard.service';

@Component({
  selector: 'job-hub-home-idea-board',
  templateUrl: './home-idea-board.component.html',
  styleUrls: ['./home-idea-board.component.scss']
})
export class HomeIdeaBoardComponent implements OnInit {

  @ViewChild(IdeaBoardComponent) ideaBoard: IdeaBoardComponent;

  ideas: Idea[] = [];
  isLoading = false;
  categories = [
    {value: ProjectAccessoryType.Patio, label: 'Patios'},
    {value: ProjectAccessoryType.Walkway, label: 'Walkways'},
    {value: ProjectAccessoryType.RetainingWall, label: 'Retaining Walls'},
    {value: ProjectAccessoryType.DrivewayParking, label: 'Driveways'},
    {value: ProjectAccessoryType.PoolPatio, label: 'Pool Patios'},
    {value: ProjectAccessoryType.Steps, label: 'Steps & Staircases'},
  ];

  constructor(
    private ideaBoardService: IdeaBoardService,
    private customerSignupWizardService: CustomerSignupWizardService
  ) { }

  ngOnInit(): void {
    this.categoryChanged(this.categories[0]);
  }

  async categoryChanged(category: Option<any>) {
    try {
      this.isLoading = true;
      if (this.ideaBoard) {
        this.ideaBoard.loaded = 0;
      }
      this.ideas = await this.ideaBoardService.getIdeasByBlock(1, category.value).toPromise();
      this.customerSignupWizardService.markSelectedIdeas(this.ideas);
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

  cardLiked() {
    const ideas = this.ideas.filter(x => x.selected).map(x => x.id);
    this.customerSignupWizardService.saveToStorage({ ideas });
  }

}
