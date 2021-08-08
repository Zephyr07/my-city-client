import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OffreListingPage } from './offre-listing.page';

describe('OffreListingPage', () => {
  let component: OffreListingPage;
  let fixture: ComponentFixture<OffreListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffreListingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OffreListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
