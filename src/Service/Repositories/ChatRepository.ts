import { Database } from "firebase-admin/lib/database/database";
import { AppAdmin } from "../../Data Access/DAO/AppAdmin/appAdmin";
import { randomUUID } from "crypto";

export class ChatRepository{
    private realtimedb: Database;
    private path;
    constructor(){
        this.realtimedb = AppAdmin.database()
        this.path = this.realtimedb.ref('chat/')
    }
    async setChat(){
        const chatRef = this.path.child('messages')
        chatRef.set({
            uid: randomUUID(),
            messages: 
        })
    }
}