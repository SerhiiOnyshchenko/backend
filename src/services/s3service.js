const { S3 } = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

exports.s3Uploadv2 = async file => {
  const s3 = new S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: `upload/${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
  };
  return await s3.upload(params).promise();
};
