import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    if (this.messages.length > 20) {
      this.messages.shift();
    }
    this.messages.push(message);
  }
}