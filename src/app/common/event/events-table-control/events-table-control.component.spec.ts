import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsTableControlComponent } from './events-table-control.component';

describe('EventsTableControlComponent', () => {
  let component: EventsTableControlComponent;
  let fixture: ComponentFixture<EventsTableControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsTableControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsTableControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
