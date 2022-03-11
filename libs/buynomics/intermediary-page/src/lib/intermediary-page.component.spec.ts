import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermediaryPageComponent } from './intermediary-page.component';

describe('IntermediaryPageComponent', () => {
  let component: IntermediaryPageComponent;
  let fixture: ComponentFixture<IntermediaryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntermediaryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntermediaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
