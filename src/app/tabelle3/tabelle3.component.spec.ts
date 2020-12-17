import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tabelle3Component } from './tabelle3.component';

describe('Tabelle3Component', () => {
  let component: Tabelle3Component;
  let fixture: ComponentFixture<Tabelle3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tabelle3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tabelle3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
