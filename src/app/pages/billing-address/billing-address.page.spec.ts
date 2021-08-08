import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillingAddressPage } from './billing-address.page';

describe('BillingAddressPage', () => {
  let component: BillingAddressPage;
  let fixture: ComponentFixture<BillingAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingAddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillingAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
