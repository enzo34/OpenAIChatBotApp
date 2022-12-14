import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toast: ToastController) { }

  async presentToast(message: string, color: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 1500,
      icon: 'warning',
      position: 'bottom',
      color: color,
      animated: true
    });
    await toast.present()
  }
}
