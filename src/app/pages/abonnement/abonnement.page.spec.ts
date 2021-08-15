import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AbonnementPage } from './abonnement.page';

describe('AbonnementPage', () => {
  let component: AbonnementPage;
  let fixture: ComponentFixture<AbonnementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonnementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AbonnementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
