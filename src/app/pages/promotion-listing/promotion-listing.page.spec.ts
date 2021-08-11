import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PromotionListingPage } from './promotion-listing.page';

describe('PromotionListingPage', () => {
  let component: PromotionListingPage;
  let fixture: ComponentFixture<PromotionListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionListingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
