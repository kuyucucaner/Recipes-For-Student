const express = require("express");
const router = express.Router();
const StorageService = require("../services/storage");

/**
 * @swagger
 * /api/storage/upload:
 *   post:
 *     tags: [Google Cloud Storage]
 *     summary: Upload a file to Google Cloud Storage
 *     description: Uploads a file to the specified Google Cloud Storage bucket.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filePath:
 *                 type: string
 *                 description: The path of the file to be uploaded.
 *                 example: "path/to/your/file.txt"
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       500:
 *         description: Error uploading file
 */
router.post("/upload", (req, res) => {
  const filePath = req.body.filePath;
  StorageService.uploadFile(filePath)
    .then(() => res.status(200).send("File uploaded successfully"))
    .catch((err) =>
      res.status(500).send(`Error uploading file: ${err.message}`)
    );
});

/**
 * @swagger
 * /api/storage/files:
 *   get:
 *     tags: [Google Cloud Storage]
 *     summary: List all files in the bucket
 *     description: Returns a list of all files in the specified Google Cloud Storage bucket.
 *     responses:
 *       200:
 *         description: A list of files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Error getting files
 */
router.get('/files', (req, res) => {
    StorageService.listFiles()
     .then((files) => res.status(200).send(files))
     .catch((err) => res.status(500).send(`Error getting files: ${err.message}`));
});

module.exports = router;

