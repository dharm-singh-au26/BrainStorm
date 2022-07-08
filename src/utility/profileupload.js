import multer from 'multer';
import multerS3 from 'multer-s3'
import aws from 'aws-sdk';


aws.config,update({

    secretAccessKey : '9aw+pFVs+rgsdThLNemFp8AaTAAJkFDea9IFlyY7',

    accessKeyId : 'AKIAREBITL6KDCI4NOV4',

    region : ' ap-south-1'

});

const s3 = new aws.S3()

const upload  = multer({
    storage:multerS3({
        s3,
        bucket:'brainstorm06',
        acl :  'public-read',
        metadata : function (req,file,cb) {
            cb(null , {fieldName : file.fieldname})
            
        },
        key : function( req,file,cb) {
            cb(null,Date.now().toString())
        }
    })
})

module.exports = upload;