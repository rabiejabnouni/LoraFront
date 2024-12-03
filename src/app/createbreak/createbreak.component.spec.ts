import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebreakComponent } from './createbreak.component';

describe('CreatebreakComponent', () => {
  let component: CreatebreakComponent;
  let fixture: ComponentFixture<CreatebreakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatebreakComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatebreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
