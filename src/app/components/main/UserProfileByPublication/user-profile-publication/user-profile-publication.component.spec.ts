import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePublicationComponent } from './user-profile-publication.component';

describe('UserProfilePublicationComponent', () => {
  let component: UserProfilePublicationComponent;
  let fixture: ComponentFixture<UserProfilePublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfilePublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfilePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
