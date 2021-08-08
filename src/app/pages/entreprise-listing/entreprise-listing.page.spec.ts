import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntrepriseListingPage } from './entreprise-listing.page';

describe('EntrepriseListingPage', () => {
  let component: EntrepriseListingPage;
  let fixture: ComponentFixture<EntrepriseListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepriseListingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntrepriseListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
