import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClickerComponent } from './clicker/clicker.component';
import { MessagesComponent } from './messages/messages.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickerComponent,
    MessagesComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
