import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TypeEntreprisesPage } from './type-entreprises.page';

describe('TypeEntreprisesPage', () => {
  let component: TypeEntreprisesPage;
  let fixture: ComponentFixture<TypeEntreprisesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeEntreprisesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TypeEntreprisesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
