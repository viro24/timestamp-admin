import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreetableHeaderComponent } from './treetable-header.component';

describe('TreetableHeaderComponent', () => {
  let component: TreetableHeaderComponent;
  let fixture: ComponentFixture<TreetableHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreetableHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreetableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
