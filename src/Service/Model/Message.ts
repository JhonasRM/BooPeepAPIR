
export class Message{
    public readonly chatID: string;
    public readonly messageID: string
    public UserID: string;
    // photoURL: string;
    public displayName: string;
    public lastmsg: string;
    public dateTime: number;

    constructor(chatID:string, uid: string, displayName: string, lastmsg: string, messageID?: string){
        this.chatID = chatID,
        this.UserID = uid,
        this.displayName = displayName,
        this.lastmsg = lastmsg,
        this.dateTime = Date.now() 
        this.messageID = crypto.randomUUID()
        if(messageID){
            this.messageID = messageID
        }
       }
}