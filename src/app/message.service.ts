import { Injectable } from '@angular/core';

import { Message } from './message';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    messages: string[] = [];
    _messages: Message[] = [];

    add(content: string) {
        // TODO: Old plain text version. Remove.
        if (this.messages.length > 20) {
            this.messages.shift();
        }
        this.messages.push(content);

        // Shiny new html version
        let message = new Message(content);
        if (this._messages.length > 20) {
            this._messages.shift();
        }
        this._messages.push(message);
    }
}