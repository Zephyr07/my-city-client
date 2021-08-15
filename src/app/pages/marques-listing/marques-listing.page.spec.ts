import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MarquesListingPage } from './marques-listing.page';

describe('MarquesListingPage', () => {
  let component: MarquesListingPage;
  let fixture: ComponentFixture<MarquesListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarquesListingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MarquesListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
