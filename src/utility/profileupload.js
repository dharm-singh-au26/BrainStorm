import multer from 'multer'
import AWS from 'aws-sdk'

export const upload = multer({}).single('image');

export const s3Bucket = new AWS.S3({
    accessKeyId: 'AKIAREBITL6KDCI4NOV4',
    secretAccessKey: '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',
    Bucket: 'brainstorm06'
})

export const uploadFileToS3 = async (fileData) => {
    return await s3Bucket.upload({
        Bucket: 'brainstorm06',
        Key: `${Date.now()}_${fileData.originalname}`,
        Body: fileData.buffer,
        ACL: 'public-read'
    }, (err, result) => {
        if(err) return {
            status: 'failed',
            message: err.message
        }
        return {
            status: 'success',
            fileLocation: result.Location
        }
    }) 
}