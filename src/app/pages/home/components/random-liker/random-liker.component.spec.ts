import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomLikerComponent } from './random-liker.component';

describe('RandomLikerComponent', () => {
  let component: RandomLikerComponent;
  let fixture: ComponentFixture<RandomLikerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomLikerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomLikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
