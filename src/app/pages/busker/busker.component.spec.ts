import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuskerComponent } from './busker.component';
import { AppModule } from '../../app.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BuskerComponent', () => {
  let component: BuskerComponent;
  let fixture: ComponentFixture<BuskerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuskerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
