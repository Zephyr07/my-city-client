import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntrepriseDetailPage } from './entreprise-detail.page';

describe('EntrepriseDetailPage', () => {
  let component: EntrepriseDetailPage;
  let fixture: ComponentFixture<EntrepriseDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepriseDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntrepriseDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
