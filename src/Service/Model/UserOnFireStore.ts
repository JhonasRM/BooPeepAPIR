import { DocumentSnapshot } from "firebase-admin/firestore";
import { decrypt, encrypt } from "../../utils/encryption/encryption";
import { createUserFromDataEncryption } from "../../utils/Helpers/CreateUserHelper";
import { IDataEncryption } from "../../utils/Interfaces/IDataEncryption";
import { isIdentifier } from "typescript";

export class UserOnFirestore {
    public readonly uid?: string

    public postsID!: string[];
    public chatID!: string;
    public course!: string;
    public shift!: string;
    public description!: string

    constructor(uid?: string, posts?: string[], chatID?: string, course?: string, shift?: string, description?: string) {
        this.postsID = [],
            this.uid = '',
            this.chatID = '',
            this.course = '',
            this.shift = '',
            this.description = ''
        if (posts) {
            this.postsID = posts
        }
        if (chatID) {
            this.chatID = chatID
        }
        if (uid) {
            this.uid = uid
        }
        if (course) {
            this.course = course
        }
        if (shift) {
            this.shift = shift
        }
        if (description) {
            this.description = description
        }
    }
    static fromDocumentSnapshot(snapshot: DocumentSnapshot): UserOnFirestore {
        const data = snapshot.data();
        const uid = snapshot.id;
        const { postsID, chatID } = data as UserOnFirestore;
        return new UserOnFirestore(uid, postsID, chatID);
    }

    encryptUser(uid: string, postID: string[], chatID?: string, course?: string, shift?: string, description?: string) {
        const encryptedUID = encrypt(uid)
        const encryptedPostsID: string[] = []
        postID.forEach(ID => {
            const IDtoEncrypt = encrypt(ID)
            encryptedPostsID.push(IDtoEncrypt)
        });
        const Data: IDataEncryption = {
            uid: encryptedUID,
            postID: encryptedPostsID
        }
        if (chatID) {
            const encryptedChatID = encrypt(chatID)
            Data.chatID = encryptedChatID
        }
        if (course) {
            const encryptCourse = encrypt(course)
            Data.course = encryptCourse
        }
        if (shift) {
            const encryptShift = encrypt(shift)
            Data.shift = encryptShift
        }
        if (description) {
            const encryptDecription = encrypt(description)
            Data.description = encryptDecription
        }
        const user = createUserFromDataEncryption(Data)
        return user
    }

    decryptUser(uid: string, postID: string[], chatID?: string, course?: string, shift?: string, description?: string) {
        // console.log(uid, postID, chatID, course, shift, description)
        const UID = decrypt(uid)
        console.log(`UID: ${UID}`)
        const PostsID: string[] = []
        postID.forEach(postID => {
            const postIDtoDecrypt = decrypt(postID)
            PostsID.push(postIDtoDecrypt)
        });
        const Data: IDataEncryption = {
            uid: UID,
            postID: PostsID
        }
        console.log(Data)
        if (chatID) {
            const ChatID = decrypt(chatID)
            Data.chatID = ChatID
            console.log(Data)
        }
        if (course) {
            const Course = decrypt(course)
            Data.course = Course
            console.log(Data)

        }
        if (shift) {
            const Shift = decrypt(shift)
            Data.shift = Shift
            console.log(Data)

        }
        if (description) {
            const Description = decrypt(description)
            Data.description = Description
            console.log(Data)

        }
        const user = createUserFromDataEncryption(Data)
        return user
    }

}