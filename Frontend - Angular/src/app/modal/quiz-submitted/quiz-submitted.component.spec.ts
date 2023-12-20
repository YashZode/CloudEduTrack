import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSubmittedComponent } from './quiz-submitted.component';

describe('QuizSubmittedComponent', () => {
  let component: QuizSubmittedComponent;
  let fixture: ComponentFixture<QuizSubmittedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizSubmittedComponent]
    });
    fixture = TestBed.createComponent(QuizSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
