import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBlancComponent } from './home-blanc.component';

describe('HomeBlancComponent', () => {
  let component: HomeBlancComponent;
  let fixture: ComponentFixture<HomeBlancComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBlancComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBlancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
