const express = require('express');
const app = express();

require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const bucketName = 'streamingtec-video';
const bucket = storage.bucket(bucketName);


app.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    try {
        const [files] = await bucket.getFiles({
            prefix: query,
        });

        if (files.length === 0) {
            return res.status(404).send('No se encontraron archivos');
        }

        const results = files.map(file => {
            return {
                title: file.name,
                url: `https://storage.googleapis.com/${bucketName}/${file.name}`
            }
        });

        res.send(results);

    } catch (error) {
        console.log("Error al encontrar el archivo: ", error);
    }
})

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
    }
);