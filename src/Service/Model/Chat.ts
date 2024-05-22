import { randomUUID } from "crypto";
import { Message } from "./Message";

export class Chat {
    public readonly chatid;
    public messages: Message[];
    constructor(){
        this.chatid = randomUUID(),
        this.messages = []
    }

}