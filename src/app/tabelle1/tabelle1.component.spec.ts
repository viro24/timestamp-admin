import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Tabelle1Component} from './tabelle1.component';

describe('Tabelle1Component', () => {
  let component: Tabelle1Component;
  let fixture: ComponentFixture<Tabelle1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tabelle1Component]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tabelle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
