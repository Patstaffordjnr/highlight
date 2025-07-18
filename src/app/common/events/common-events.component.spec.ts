import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonEventsComponent } from './common-events.component';

describe('CommonEventsComponent', () => {
  let component: CommonEventsComponent;
  let fixture: ComponentFixture<CommonEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
