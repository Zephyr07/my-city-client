import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IniscreenPage } from './iniscreen.page';

describe('IniscreenPage', () => {
  let component: IniscreenPage;
  let fixture: ComponentFixture<IniscreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniscreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IniscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
