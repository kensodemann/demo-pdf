import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PdfService } from '../core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(private pdf: PdfService, private toastController: ToastController) {}

  async store() {
    await this.pdf.storeDocument();
    this.presentToast();
  }

  async clear() {
    await this.pdf.removeDocument();
    this.presentToast();
  }

  private async presentToast() {
    const toast = await this.toastController.create({
      message: 'Requested change has been made.',
      position: 'top',
      duration: 2000,
    });
    toast.present();
  }
}
