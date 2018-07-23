import { Component } from '@angular/core';
import { NavController, Platform, AlertController} from 'ionic-angular';
//import { LocalNotifications } from '@ionic-native/local-notifications'
//import {FCMPlugin} from 'cordova-plugin-fcm';
import { v4 as uuid } from 'uuid';

declare var cordova;

declare var FCMPlugin;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
interval: any;
times: any;
//fcmtoken: any;
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
        this.updateNotificationLocal();
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
  //this.fcmtoken = '';

  console.log('trying to set sender ID');
  FCMPlugin.setSenderId('1043784930865',
   function() {
      console.log('Set sender id success');
  }, function(error) {
    console.log(error);
    alert(error)
  });

  console.log('trying to get FCM token');
  FCMPlugin.getToken(function(token){
      console.log('Token: ' + token);
      alert(token);
      //this.fcmtoken = '' + token;
  });

}


  scheduleNotificationLocal() {
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

  updateNotificationLocal() {
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

  cancelNotificationLocal() {
    (<any>cordova).plugins.notification.local.clearAll();
    (<any>cordova).plugins.notification.local.cancelAll();
    console.log('Notifications Cancelled!!');
  }



  scheduleNotificationPush() {
      var _i: number;
      for( _i = 0; _i < this.times; _i++) {
        var _id = _i + 1;

        FCMPlugin.upstream({
          eventId: uuid(),
          action: 'SCHEDULE',
          notificationTitle:'Schedule ID - ' + _id ,
          notificationMessage: this.interval * _id / 60 + ' min notify',
          time: new Date().getTime() + this.interval * _id * 1000,
          subjectId: 'yatharth',
          expiry: 60 * 10 * 1000
        }, function(succ) {
          console.log(succ);
        }, function(err) {
          console.log(err);
        });
      }
    }

  cancelNotificationPush() {
      FCMPlugin.upstream({
        eventId: uuid(),
        action: 'CANCEL',
        cancelType: 'all',
        subjectId: 'yatharth'
      }, function(succ) {
        console.log(succ);
      }, function(err) {
        console.log(err);
      });
      console.log('Notifications Cancelled!!');
    }

}
