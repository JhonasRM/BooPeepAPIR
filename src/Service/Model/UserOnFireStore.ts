import { DocumentSnapshot } from "firebase-admin/firestore";
import { decrypt, encrypt } from "../../utils/encryption";

export class UserOnFirestore{
    public readonly uid?: string 

    public postsID!: string[];
    public chatID!: string;
    public course!: string;
    public shift!: string;
    public description!: string

    constructor(uid?: string, posts?: string[], chatID?: string, course?: string,shift?: string, description?: string){
        this.postsID = [],
        this.uid = '',
        this.chatID = '',
        this.course = '',
        this.shift = '',
        this.description = ''
        if(posts){
            this.postsID = posts
        }
        if(chatID){
            this.chatID = chatID
        }
        if(uid){
            this.uid = uid
        }
        if(course){
            this.course = course
        }
        if(shift){
            this.shift = shift
        }
        if(description){
            this.description = description
        }
    }
    static fromDocumentSnapshot(snapshot: DocumentSnapshot): UserOnFirestore {
        const data = snapshot.data();
        const uid = snapshot.id;
        const { postsID, chatID } = data as UserOnFirestore;
        return new UserOnFirestore(uid, postsID, chatID);
    }

    encryptUser(uid: string, postID: string[], chatID?: string){
        const encryptedUID = encrypt(uid)
        const encryptedPostsID: string[] = []
        postID.forEach(ID => {
            const IDtoEncrypt = encrypt(ID)
            encryptedPostsID.push(IDtoEncrypt)
        });
        if(chatID){
        const encryptedChatID = encrypt(chatID)
        return new UserOnFirestore(encryptedUID, encryptedPostsID, encryptedChatID)
    }
    return new UserOnFirestore(encryptedUID, encryptedPostsID)
    }

    decryptUser(uid: string, postID: string[], chatID?: string){
        const UID = decrypt(uid)
        const PostsID: string[] = []
        postID.forEach(ID => {
            const IDtoDecrypt = decrypt(ID)
            PostsID.push(IDtoDecrypt)
        });
        if(chatID){
        const ChatID = decrypt(chatID)
        return new UserOnFirestore(UID, PostsID,ChatID)
    }
    return new UserOnFirestore(UID, PostsID)
    }
    
}