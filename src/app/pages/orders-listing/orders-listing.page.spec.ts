import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdersListingPage } from './orders-listing.page';

describe('OrdersListingPage', () => {
  let component: OrdersListingPage;
  let fixture: ComponentFixture<OrdersListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersListingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
