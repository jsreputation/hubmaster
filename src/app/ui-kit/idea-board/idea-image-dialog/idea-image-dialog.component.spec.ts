import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaImageDialogComponent } from './idea-image-dialog.component';

describe('IdeaImageDialogComponent', () => {
  let component: IdeaImageDialogComponent;
  let fixture: ComponentFixture<IdeaImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeaImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
