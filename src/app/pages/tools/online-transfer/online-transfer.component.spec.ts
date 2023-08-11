import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineTransferComponent } from './online-transfer.component';

describe('OnlineTransferComponent', () => {
  let component: OnlineTransferComponent;
  let fixture: ComponentFixture<OnlineTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlineTransferComponent]
    });
    fixture = TestBed.createComponent(OnlineTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
