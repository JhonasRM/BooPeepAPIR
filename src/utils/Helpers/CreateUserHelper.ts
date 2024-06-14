import { UserOnFirestore } from "../../Service/Model/UserOnFireStore";
import { IDataEncryption } from "../../utils/Interfaces/IDataEncryption";

export function createUserFromDataEncryption(data: Partial<IDataEncryption>): UserOnFirestore {
    const {
        uid = '',
        postID = [],
        chatID = '',
        course = '',
        shift = '',
        description = ''
    } = data;

    return new UserOnFirestore(uid, postID, chatID, course, shift, description);
}

