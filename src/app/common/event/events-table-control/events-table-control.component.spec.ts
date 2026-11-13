import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsTableControlComponent } from './events-table-control.component';
import { AppModule } from '../../../app.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('EventsTableControlComponent', () => {
  let component: EventsTableControlComponent;
  let fixture: ComponentFixture<EventsTableControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [provideHttpClientTesting()]
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
