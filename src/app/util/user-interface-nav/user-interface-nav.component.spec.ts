import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInterfaceNavComponent } from './user-interface-nav.component';

describe('UserInterfaceNavComponent', () => {
  let component: UserInterfaceNavComponent;
  let fixture: ComponentFixture<UserInterfaceNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInterfaceNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserInterfaceNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
