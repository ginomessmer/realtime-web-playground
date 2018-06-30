import { Component, OnInit } from '@angular/core';
import { SocketService } from './broadcast/common/services/socket.service';
import { Activity } from './broadcast/common/data/activity';
import { Event } from './broadcast/common/enums/event.enum';

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

  constructor(private socketService: SocketService) {

  }

  ngOnInit() {
    this.initIoConnection();
  }

  private initIoConnection() {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onActivity()
      .subscribe((activity: Activity) => {
        this.activities.push(activity);
      });

    this.socketService.onEvent(Event.CONNECT).subscribe(() => {
      console.log('Connected to socket server');
    });

    this.socketService.onEvent(Event.DISCONNECT).subscribe(() => {
      console.log('Disconnected from socket server');
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
