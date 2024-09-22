const express = require('express');
const cors = require('cors')
const app = express();
const {saveDataVideo} = require('./fireBase/SaveDataBucket');

require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const bucketName = 'streamingtec-video';
const bucket = storage.bucket(bucketName);

app.use(cors());

app.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    console.log(query)
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
        console.log(results)
        res.send(results);

    } catch (error) {
        console.log("Error al encontrar el archivo: ", error);
    }
})

// Obtener 9 videos aleatorias
app.get('/random-videos', async (req, res) => {
    try {
        const [files] = await bucket.getFiles();
        
        if (files.length === 0) {
            return res.status(404).send('No se encontraron archivos');
        }

        // Seleccionar 9 videos aleatorias
        const shuffled = files.sort(() => 0.5 - Math.random());
        const selectedFiles = shuffled.slice(0, 9);

        const results = selectedFiles.map(file => {
            return {
                title: file.name,
                url: `https://storage.googleapis.com/${bucketName}/${file.name}`
            }
        });

        res.send(results);

    } catch (error) {
        console.log("Error al obtener canciones aleatorias: ", error);
        res.status(500).send('Error al obtener canciones aleatorias');
    }
});

//Obtener todo los datos de los videos y enviarlos a firebase
async function getDataVideo() {
    const [files]=await storage.bucket(bucketName).getFiles();
    const data= files.map(file=>{
        return{
            nombre:file.name,
            url:`https://storage.googleapis.com/${bucketName}/${file.name}`
        };
    });
    return data
}

async function getProcessVideo(){
    const saveData = await getDataVideo();
    await saveDataVideo(saveData);
}
getProcessVideo();

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
    }
);