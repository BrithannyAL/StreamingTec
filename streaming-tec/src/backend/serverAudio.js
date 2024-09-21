const express = require('express');
const cors = require('cors')
const app = express();
const {saveDataAudio} = require('./fireBase/SaveDataBucket');

require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const bucketName = 'streamingtec-audios';
const bucket = storage.bucket(bucketName);

app.use(cors());

//Para hacer busquedas segun el nombre del audio desde la barra de busqueda en la interfaz
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

        res.send(results);

    } catch (error) {
        console.log("Error al encontrar el archivo: ", error);
    }
})

// Obtener 9 canciones aleatorias
app.get('/random-songs', async (req, res) => {
    try {
        const [files] = await bucket.getFiles();
        
        if (files.length === 0) {
            return res.status(404).send('No se encontraron archivos');
        }

        // Seleccionar 9 canciones aleatorias
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

//Obtener todo los datos del audio y enviarlos a firebase
async function getDataAudio() {
    const [files]=await storage.bucket(bucketName).getFiles();
    const data= files.map(file=>{
        return{
            nombre:file.name,
            url:`https://storage.googleapis.com/${bucketName}/${file.name}`
        };
    });
    return data
}

async function getProcessAudio(){
    const saveData = await getDataAudio();
    await saveDataAudio(saveData);
}
getProcessAudio();

app.listen(5002, () => {
    console.log('Server is running on http://localhost:5002');
    }
);