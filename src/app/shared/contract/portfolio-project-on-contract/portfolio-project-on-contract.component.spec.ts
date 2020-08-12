import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioProjectOnContractComponent } from './portfolio-project-on-contract.component';

describe('PortfolioProjectOnContractComponent', () => {
  let component: PortfolioProjectOnContractComponent;
  let fixture: ComponentFixture<PortfolioProjectOnContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioProjectOnContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioProjectOnContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
