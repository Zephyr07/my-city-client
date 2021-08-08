import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductsListingPage } from './products-listing.page';

describe('ProductsListingPage', () => {
  let component: ProductsListingPage;
  let fixture: ComponentFixture<ProductsListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsListingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
