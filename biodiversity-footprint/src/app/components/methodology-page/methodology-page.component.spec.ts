import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodologyPageComponent } from './methodology-page.component';

describe('MethodologyPageComponent', () => {
  let component: MethodologyPageComponent;
  let fixture: ComponentFixture<MethodologyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodologyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodologyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
