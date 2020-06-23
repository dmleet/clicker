import { Injectable } from '@angular/core';

import { Message } from './message';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    messages: Message[] = [];

    add(content: string) {
        // Shiny new html version
        let message = new Message(content);
        if (this.messages.length > 20) {
            this.messages.shift();
        }
        this.messages.push(message);
    }
}