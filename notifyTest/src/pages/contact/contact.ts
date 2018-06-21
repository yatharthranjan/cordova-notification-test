import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
//import { LocalNotifications } from '@ionic-native/local-notifications'

declare var cordova;
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, private plt: Platform, alertCtrl: AlertController) {
    this.plt.ready().then((readySource) => {
      (<any>cordova).plugins.notification.local.on('click').subscribe(notification => {
        let alert = alertCtrl.create({
          title: notification.text,
          subTitle: 'You opened the notification'
        });
        alert.present();
      })
    });

  }


  scheduleNotification() {
    // Schedule delayed notification
    console.log(new Date().getTime());
    (<any>cordova).plugins.notification.local.schedule({
      id: 100,
      title: 'Notify Test',
      text: 'Right now notify',
      led: 'FF0000',
      sound: null
      });

    console.log('Notification Scheduled Right Now');
  }
}
