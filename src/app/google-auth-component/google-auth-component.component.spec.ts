import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthComponent } from './google-auth-component.component';


describe('GoogleAuthComponentComponent', () => {
  let component: GoogleAuthComponent;
  let fixture: ComponentFixture<GoogleAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
