import { Component, OnInit } from '@angular/core';
import { SocketService } from './broadcast/common/services/socket.service';
import { Activity } from './broadcast/common/data/activity';
import { Event } from './broadcast/common/enums/event.enum';
import { NotificationsService } from 'angular2-notifications';
import { PushNotificationsService } from 'ng-push';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  activityContent: string = null;
  activities: Activity[] = [];

  nickname: string = null;
  isNameLocked: boolean = false;

  ioConnection: any;

  isServerAvailable: boolean = false;

  constructor(private socketService: SocketService,
    private notificationService: NotificationsService,
    private pushNotificationService: PushNotificationsService) {

  }

  ngOnInit() {
    this.initIoConnection();
    this.pushNotificationService.requestPermission();
  }

  private initIoConnection() {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onActivity()
      .subscribe((activity: Activity) => {
        // this.notificationService.info(activity.nickname, activity.content);
        this.pushNotificationService.create(activity.nickname, {
          body: activity.content
        }).subscribe(
          res => console.log(res),
          err => { console.log(err); }
        );

        this.activities.push(activity);
      });

    this.socketService.onEvent(Event.CONNECT).subscribe(() => {
      console.log('Connected to socket server');
      this.isServerAvailable = true;
    });

    this.socketService.onEvent(Event.DISCONNECT).subscribe(() => {
      console.log('Disconnected from socket server');
      this.isServerAvailable = false;
    });
  }

  public sendBroadcast() {
    if(this.activityContent == null || this.activityContent == '') {
      return;
    }

    this.socketService.send({
      nickname: this.nickname,
      content: this.activityContent,
      createdAt: Date.now().toString()
    });

    this.activityContent = null;
    this.isNameLocked = true;
  }
}
