const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const bucketName = '18082024gc';

async function uploadFile(filePath) {
  await storage.bucket(bucketName).upload(filePath, {
    destination: filePath,
  });
  console.log(`${filePath} uploaded to ${bucketName}`);
}

async function listFiles() {
  const [files] = await storage.bucket(bucketName).getFiles();
  return files.map(file => file.name);
}

module.exports = {
  uploadFile,
  listFiles,
};
