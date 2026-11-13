import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuskersComponent } from './buskers.component';
import { AppModule } from '../../app.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BuskersComponent', () => {
  let component: BuskersComponent;
  let fixture: ComponentFixture<BuskersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuskersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
