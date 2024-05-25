import { randomUUID } from "crypto";
import { Message } from "./Message";

export class Chat {
    public readonly chatid;
    public messages: Message[];
    public readonly uid;
    constructor( uid:string ){
        this.chatid = randomUUID(),
        this.messages = []
        this.uid = uid
    }

}