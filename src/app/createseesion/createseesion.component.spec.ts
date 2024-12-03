import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateseesionComponent } from './createseesion.component';

describe('CreateseesionComponent', () => {
  let component: CreateseesionComponent;
  let fixture: ComponentFixture<CreateseesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateseesionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateseesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
