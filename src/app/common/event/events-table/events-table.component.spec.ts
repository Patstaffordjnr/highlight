import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsTableComponent } from './events-table.component';
import { AppModule } from '../../../app.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('EventsTableComponent', () => {
  let component: EventsTableComponent;
  let fixture: ComponentFixture<EventsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [provideHttpClientTesting()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
