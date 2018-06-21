import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
//import { LocalNotifications } from '@ionic-native/local-notifications'

declare var cordova;
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  duration: any;
  flag: any;
  constructor(public navCtrl: NavController, private plt: Platform, private alertCtrl: AlertController) {
    this.plt.ready().then((readySource) => {
      (<any>cordova).plugins.notification.local.on('click').subscribe(notification => {
        let alert = alertCtrl.create({
          title: notification.text,
          subTitle: 'You opened the notification'
        });
        alert.present();
      })
    });
    this.duration = 60;
    this.flag = false;
  }

  scheduleNotification() {

    // Schedule delayed notification
    console.log(this.duration);
    console.log(new Date().getTime());
    (<any>cordova).plugins.notification.local.schedule({
      id: 200,
      title: 'Notify Test',
      text: 'Single custom notify',
      trigger: {at: new Date(new Date().getTime() + this.duration * 1000)},
      led: 'FF0000',
      sound: null
      });

    console.log('Single Notification Scheduled');
  }

  isNotificationScheduled() {
    (<any>cordova).plugins.notification.local.isScheduled(200).then(function(result) {
        //console.log(result);
        this.flag = result;
      }, function(err) {
        console.log(err);
      }).catch(function(error) {
        console.error(error);
      });
    let alert = this.alertCtrl.create({
      title: 'Is the notification scheduled ?',
      subTitle: 'Result ' + this.flag
    });
    alert.present();
  }

}
