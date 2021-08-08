import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OffrePrixPage } from './offre-prix.page';

describe('OffrePrixPage', () => {
  let component: OffrePrixPage;
  let fixture: ComponentFixture<OffrePrixPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffrePrixPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OffrePrixPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
