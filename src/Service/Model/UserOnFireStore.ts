import { DocumentSnapshot } from "firebase-admin/firestore";
import { decrypt, encrypt } from "./encryption";

export class UserOnFirestore{
    public readonly uid?: string 

    public postsID!: string[];
    public chatID!: string;

    constructor(uid?: string, posts?: string[], chatID?: string){
        this.postsID = []
        if(posts){
            this.postsID = posts
        }
        if(chatID){
            this.chatID = chatID
        }
        if(uid){
            this.uid = uid
        }
    }
    static fromDocumentSnapshot(snapshot: DocumentSnapshot): UserOnFirestore {
        const data = snapshot.data();
        const uid = snapshot.id;
        const { postsID, chatID } = data as UserOnFirestore;
        return new UserOnFirestore(uid, postsID, chatID);
    }

    encryptUser(uid: string, postID: string[], chatID: string){
        const encryptedUID = encrypt(uid)
        const encryptedPostsID: string[] = []
        postID.forEach(ID => {
            const IDtoEncrypt = encrypt(ID)
            encryptedPostsID.push(IDtoEncrypt)
        });
        const encryptedChatID = encrypt(chatID)
        return new UserOnFirestore(encryptedUID, encryptedPostsID, encryptedChatID)
    }

    decryptUser(uid: string, postID: string[], chatID: string){
        const UID = decrypt(uid)
        const PostsID: string[] = []
        postID.forEach(ID => {
            const IDtoDecrypt = decrypt(ID)
            PostsID.push(IDtoDecrypt)
        });
        const ChatID = decrypt(chatID)
        return new UserOnFirestore(UID, PostsID,ChatID)
    }
    
}