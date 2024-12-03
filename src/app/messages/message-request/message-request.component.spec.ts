import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageRequestComponent } from './message-request.component';

describe('MessageRequestComponent', () => {
  let component: MessageRequestComponent;
  let fixture: ComponentFixture<MessageRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
