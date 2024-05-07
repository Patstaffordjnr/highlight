import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalDateAndTimeComponent } from './global-date-and-time.component';

describe('GlobalDateAndTimeComponent', () => {
  let component: GlobalDateAndTimeComponent;
  let fixture: ComponentFixture<GlobalDateAndTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalDateAndTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalDateAndTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
