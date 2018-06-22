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
times: any;
constructor(public navCtrl: NavController, private plt: Platform, alertCtrl: AlertController) {
  this.plt.ready().then((readySource) => {
    (<any>cordova).plugins.notification.local.on('click').subscribe(notification => {
      let alert = alertCtrl.create({
        title: notification.text,
        subTitle: 'You opened the notification'
      });
      alert.present();
    });
    (<any>cordova).plugins.notification.local.on('trigger').subscribe(notification => {
      if( notification.id == 100 ) {
        this.updateNotification();
      }
    });
  });
/*
  console.log('in here. It feels great!');
  (<any>cordova).plugins.notification.local.getAll().then(function(notifyArray){
    console.log(notifyArray.length);
      this.notifyList = notifyArray;
    });*/
  this.interval = 360;
  this.times = 100;

}


  scheduleNotification() {
    var _i: number;
    for( _i = 0; _i < this.times; _i++) {
      var _id = _i + 1;
      // Schedule delayed notification
      (<any>cordova).plugins.notification.local.schedule({
      id: _id,
      title: 'ID - ' + _id,
      text: this.interval / 60 + ' min notify',
      trigger: {at: new Date(new Date().getTime() + this.interval * _i * 1000)},
      led: 'FF0000',
      sound: null
      })
    }
  }

  updateNotification() {
    var _i: number;
    for( _i = 0; _i < this.times; _i++) {
      var _id = _i + 1;
      // Schedule delayed notification
      (<any>cordova).plugins.notification.local.update({
      id: _id,
      title: 'ID - ' + _id,
      text: this.interval / 60 + ' min notify',
      trigger: {at: new Date(new Date().getTime() + this.interval * _i * 1000)},
      led: 'FF0000',
      sound: null
      })
    }
  }

  cancelNotification() {
    (<any>cordova).plugins.notification.local.clearAll();
    (<any>cordova).plugins.notification.local.cancelAll();
    console.log('Notifications Cancelled!!');
  }

}
