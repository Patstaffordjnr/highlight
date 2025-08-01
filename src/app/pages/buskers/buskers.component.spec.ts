import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuskersComponent } from './buskers.component';

describe('BuskersComponent', () => {
  let component: BuskersComponent;
  let fixture: ComponentFixture<BuskersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuskersComponent]
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
