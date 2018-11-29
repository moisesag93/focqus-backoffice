import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginasDialogComponent } from './paginas-dialog.component';

describe('PaginasDialogComponent', () => {
  let component: PaginasDialogComponent;
  let fixture: ComponentFixture<PaginasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
