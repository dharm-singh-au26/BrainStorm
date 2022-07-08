import multer from 'multer';
import S3 from 'aws-s3';

const config = {
    bucketName: process.env.bucketName,
    dirName: 'UserImages', /* optional */
    secretAccessKey : process.env.Secret_Access_Key,
    accessKeyId : process.env.Access_Key_ID,
    region : 'ap-south-1'
};

export const S3Client = new S3(config)

export const upload  = multer({})