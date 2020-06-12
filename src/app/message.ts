
/**
 * @description Message: A message consists of parts that contain style names.
 * @author Daniel Leet
 * example: "This is a *scary:test message*"
 * becomes: "<span>This is a </span><span class=\"scary\">test message</span>"
 */
export class Message {
    parts: MessagePart[] = [];

    constructor(content: string) {
        this.parse(content);
    }

    /**
     * @description Assemble the message parts into an html string
     * @returns html as a string()
     */
    public html(): string
    {
        let content = "";
        this.parts.forEach(part => content += this.buildChunkHtml(part));

        return content;
    }

    private buildChunkHtml(c: MessagePart) {
        return "<span class=\"" + c.style + "\">" + c.content + "</span>";
    }

    private parse(content: string) {
        const SYM = '*';
        const DELIM = ':';

        // No special parts
        let splitted = content.split(SYM);
        if (splitted.length == 1)
        {
            this.parts.push(new MessagePart(content, MessageStyle.Normal));
            return;
        }

        // special parts
        if ((splitted.length - 1) % 2 == 0) {
            for (let i = 0; i < splitted.length; i++) {
                // odd parts will always be default, but might be empty
                if (i % 2 == 0) {
                    this.parts.push(new MessagePart(splitted[i], MessageStyle.Normal));
                } else {
                    let items = splitted[i].split(DELIM, 2);
                    if (items.length < 2) { // no DELIM found, treat as default
                        this.parts.push(new MessagePart(splitted[i], MessageStyle.Normal));
                        continue;
                    }
                    let style = MessageStyle.Normal;
                    switch (items[0]) {
                        case "bold": style = MessageStyle.Bold; break;
                        case "scary": style = MessageStyle.Scary; break;
                        case "visual": style = MessageStyle.Visual; break;
                        case "slanted": style = MessageStyle.Slanted; break;
                        case "error": style = MessageStyle.Error; break;
                    }
                    this.parts.push(new MessagePart(items[1], style));
                }
            }
        }
    }
}

class MessagePart {
    content: string;
    style: MessageStyle;

    constructor(c: string, s: MessageStyle) {
        this.content = c;
        this.style = s;
    }
}

enum MessageStyle {
    Normal = "normal",
    Bold = "bold",
    Scary = "scary",
    Visual = "visual",
    Slanted = "slanted",
    Error = "error"
}