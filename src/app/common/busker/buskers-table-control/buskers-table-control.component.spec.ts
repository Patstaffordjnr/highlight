import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuskersTableControlComponent } from './buskers-table-control.component';
import { AppModule } from '../../../app.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BuskersTableControlComponent', () => {
  let component: BuskersTableControlComponent;
  let fixture: ComponentFixture<BuskersTableControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuskersTableControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
