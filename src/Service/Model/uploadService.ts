import { bucket } from '../firebase';

export const uploadImage = async (file: Express.Multer.File): Promise<string> => {
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: file.mimetype,
        },
    });

    return new Promise((resolve, reject) => {
        blobStream.on('error', reject);

        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
};