import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalUpdateFotoPerfilPage } from './modal-update-foto-perfil.page';

describe('ModalUpdateFotoPerfilPage', () => {
  let component: ModalUpdateFotoPerfilPage;
  let fixture: ComponentFixture<ModalUpdateFotoPerfilPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUpdateFotoPerfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalUpdateFotoPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
