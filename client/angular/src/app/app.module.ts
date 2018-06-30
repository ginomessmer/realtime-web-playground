import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { PushNotificationsModule } from 'ng-push';

import { AppComponent } from './app.component';
import { BroadcastModule } from './broadcast/broadcast.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    PushNotificationsModule,
    BroadcastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
