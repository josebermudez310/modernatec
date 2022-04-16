import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FaceService } from '../../services/face.service';
import { AlertController, ModalController } from '@ionic/angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@awesome-cordova-plugins/camera-preview/ngx';
import { ModalUserSegPage } from '../../pages/modal-user-seg/modal-user-seg.page';

@Component({
  selector: 'app-home-seg',
  templateUrl: './home-seg.component.html',
  styleUrls: ['./home-seg.component.scss'],
})
export class HomeSegComponent implements OnInit, OnDestroy {

  @ViewChild('video') video: ElementRef;

  persona: any;
  cameraPreviewOpts: CameraPreviewOptions;
  modal;
  identificando: boolean = false;
  android: boolean = false;
  load: boolean = false;
  currentStram;
  constructor(
    private faceService: FaceService,
    private alertController: AlertController,
    private cameraPreview: CameraPreview,
    private modalController: ModalController
  ) {
    this.cameraPreviewOpts = {
      x: 100,
      y: 100,
      width: 250,
      height: 250,
      camera: 'rear',
      storeToFile: false
    }
  }

  async ngOnInit() {
    await this.checkMedia();
    this.identify();
  }

  ngOnDestroy(): void {
    if (this.android) {
      this.cameraPreview.stopCamera();
    }
  }

  async checkMedia() {

    await this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        this.android = true;
      }
    ).catch(
      err => {
      }
    );
    if (navigator && navigator.mediaDevices && !this.android) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      }).then((stream) => {
        this.load = true
        this.currentStram = stream;
      }).catch(async (err) => {

        const alert = await this.alertController.create({
          message: 'No se ha podido encender la cámara, por favor asegurese contar con una y dar los permisos necesarios',
          buttons: ['ok']
        });

        await alert.present();

      })
    } else {

    }
  }

  async identificarBase64(base64) {

    if (this.android) {
      await this.cameraPreview.stopCamera();
    }
    this.faceService.identifyBase64(base64).subscribe(
      (res: any) => {
        if (res.identifyResults[0].candidates[0]) {
          this.persona = res.identifyResults[0].candidates[0];
          this.faceService.getPerson(res.identifyResults[0].candidates[0].personId).subscribe(
            async (res: any) => {

              const modal = await this.modalController.create({
                component: ModalUserSegPage,
                componentProps: {
                  'persona': this.persona,
                  'id': res.identificacion
                },
                backdropDismiss:false
              });
              await modal.present();

              modal.onDidDismiss().then(
                async resp => {
                  if (this.android) {
                    await this.cameraPreview.startCamera(this.cameraPreviewOpts);
                  }
                  this.identificando = false;

                }
              );
            },
            async err => {
              this.identificando = false;
              if (this.android) {
                await this.cameraPreview.startCamera(this.cameraPreviewOpts);
              }
            }
          )
        }else{
          this.identificando = false
          if (this.android) {
            this.cameraPreview.startCamera(this.cameraPreviewOpts);
          }
        }
      }
      , async err => {
        this.identificando = false
        if (this.android) {
          await this.cameraPreview.startCamera(this.cameraPreviewOpts);
        }
      }
    )
  }

  identify() {
    setInterval(() => {
      if (this.load && !this.identificando) {
        this.identificando = true;
        const picture = document.createElement('canvas') as HTMLCanvasElement;
        const { videoWidth, videoHeight } = this.video.nativeElement;
        picture.width = videoWidth;
        picture.height = videoHeight;
        picture.getContext('2d').drawImage(this.video.nativeElement, 0, 0, videoWidth, videoHeight);

        const base = picture.toDataURL();
        const baseArray = base.split(',');
        const base64 = baseArray[1];

        this.identificarBase64(base64);
      }
    }, 5000);
  }

  tomarFoto() {
    //establecer las opciones de la foto
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 85
    }
    //tomar la fotográfia y enviar a identificar
    this.cameraPreview.takePicture(pictureOpts).then(imageData => {
      this.identificarBase64(imageData[0]);
    })

  }

  loadedMetaData() {
    this.video.nativeElement.play();
    this.load = true;
    this.identify();
  }

  play() {

  }

}
