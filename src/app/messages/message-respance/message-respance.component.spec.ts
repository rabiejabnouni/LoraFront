import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageRespanceComponent } from './message-respance.component';

describe('MessageRespanceComponent', () => {
  let component: MessageRespanceComponent;
  let fixture: ComponentFixture<MessageRespanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageRespanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageRespanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
