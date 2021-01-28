import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Tabelle2Component} from './tabelle2.component';

describe('Tabelle2Component', () => {
  let component: Tabelle2Component;
  let fixture: ComponentFixture<Tabelle2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tabelle2Component]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tabelle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
