import { User } from "./User";

export class Message{
    public readonly chatID: string;
    public UserID: string;
    // photoURL: string;
    public displayName: string;
    public lastmsg: string;
    public dataTime: number;

    constructor(chatID:string, lastmsg: string, user:User ){
        this.chatID = chatID,
        this.UserID = user.uid,
        this.displayName = user.displayName,
        this.lastmsg = lastmsg,
        this.dataTime = Date.now() 
       }
}