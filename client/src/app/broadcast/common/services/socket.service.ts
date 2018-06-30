import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client';
import { Activity } from '../data/activity';
import { Observable, observable } from 'rxjs';
import { Event } from '../enums/event.enum';

const SERVER_URL = 'http://localhost:8282';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public send(item: Activity) {
    this.socket.emit('activity', item);
  }

  public onActivity(): Observable<Activity> {
    return new Observable<Activity>(observer => {
      this.socket.on('activity', (data: Activity) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
