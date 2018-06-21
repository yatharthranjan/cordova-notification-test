import { Component } from '@angular/core';
import { NavController, Platform, AlertController} from 'ionic-angular';
//import { LocalNotifications } from '@ionic-native/local-notifications'

declare var cordova;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
interval: any;
notifyList:any;
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
/*
  console.log('in here. It feels great!');
  (<any>cordova).plugins.notification.local.getAll().then(function(notifyArray){
    console.log(notifyArray.length);
      this.notifyList = notifyArray;
    });*/
  this.interval = 360;

}


  scheduleNotification() {
    // Schedule delayed notification
    (<any>cordova).plugins.notification.local.schedule([{
    id: 1,
    text: this.interval / 60 + ' min notify',
    trigger: {at: new Date(new Date().getTime() + this.interval * 1000)},
    led: 'FF0000',
    sound: null
    }, {
      id: 2,
    text: 2 * this.interval / 60 +' min notify',
    trigger: {at: new Date(new Date().getTime() + 2 * this.interval * 1000)},
    led: 'FF0000',
    sound: null
    }, {
      id: 3,
      text: 3 * this.interval / 60 + ' min notify',
      trigger: {at: new Date(new Date().getTime() + 3 * this.interval * 1000)},
      led: 'FF0000',
      sound: null
    }, {
      id: 4,
      text: 4 * this.interval / 60 + ' min notify',
      trigger: {at: new Date(new Date().getTime() + 4 * this.interval * 1000)},
      led: 'FF0000',
      sound: null
    }, {
      id: 5,
      text: 5 * this.interval / 60 + ' min notify',
      trigger: {at: new Date(new Date().getTime() + 5 * this.interval * 1000)},
      led: 'FF0000',
      sound: null
    }, {
      id: 6,
      text: 6 * this.interval / 60 + ' min notify',
      trigger: {at: new Date(new Date().getTime() + 6 * this.interval * 1000)},
      led: 'FF0000',
      sound: null
    }, {
      id: 7,
      text: 7 * this.interval / 60 + ' min notify',
      trigger: {at: new Date(new Date().getTime() + 7 * this.interval * 1000)},
      led: 'FF0000',
      sound: null
    }, {
      id: 8,
      text: 8 * this.interval / 60 + ' min notify',
      trigger: {at: new Date(new Date().getTime() + 8 * this.interval * 1000)},
      led: 'FF0000',
      sound: null
    }, {
      id: 9,
      text: 9 * this.interval / 60 + ' min notify',
      trigger: {at: new Date(new Date().getTime() + 9 * this.interval * 1000)},
      led: 'FF0000',
      sound: null
    }, {
      id: 10,
      text: 10 * this.interval / 60 + ' min notify',
      trigger: {at: new Date(new Date().getTime() + 10 * this.interval * 1000)},
      led: 'FF0000',
      sound: null
    }
    ]);
      console.log('Notifications Scheduled');
  }

  cancelNotification() {
    (<any>cordova).plugins.notification.local.clearAll();
    (<any>cordova).plugins.notification.local.cancelAll();
    console.log('Notifications Cancelled!!');
  }

}
