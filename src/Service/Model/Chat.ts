import { randomUUID } from "crypto";
import { Message } from "./Message";

export class Chat {
    public readonly chatid;
    public messages: Message[];
    public readonly uid;
    constructor( uid:string, messages?: Message[], chatID?: string ){
        this.chatid = randomUUID(),
        this.messages = []
        this.uid = uid
if(messages){
this.messages = messages
}
if(chatID){
this.chatid = chatID
}
    }

}