import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreencastComponent } from './screencast.component';

describe('ScreencastComponent', () => {
  let component: ScreencastComponent;
  let fixture: ComponentFixture<ScreencastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreencastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreencastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
