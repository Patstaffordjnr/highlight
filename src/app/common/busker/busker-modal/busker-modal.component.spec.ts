import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuskerModalComponent } from './busker-modal.component';
import { AppModule } from '../../../app.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BuskerModalComponent', () => {
  let component: BuskerModalComponent;
  let fixture: ComponentFixture<BuskerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuskerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
