import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OffreDetailPage } from './offre-detail.page';

describe('OffreDetailPage', () => {
  let component: OffreDetailPage;
  let fixture: ComponentFixture<OffreDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffreDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OffreDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
