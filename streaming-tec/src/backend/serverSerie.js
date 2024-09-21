const express = require('express');
const cors = require('cors')
const app = express();
const {saveDataSerie} = require('./fireBase/SaveDataBucket');

require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const bucketName = 'streamingtec-series';
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

        res.send(results);

    } catch (error) {
        console.log("Error al encontrar el archivo: ", error);
    }
})

// Obtener 9 videos de series aleatorias
app.get('/random-series', async (req, res) => {
    try {
        const [files] = await bucket.getFiles();
        
        if (files.length === 0) {
            return res.status(404).send('No se encontraron archivos');
        }

        // Seleccionar 9 videos de series aleatorias
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

// Obtener todos los datos de las series y enviarlos a Firebase
async function getDataSeries() {
    const [files] = await storage.bucket(bucketName).getFiles();
    
    const data = [];

    files.forEach(file => {
        // Separar el nombre de la carpeta y el nombre del archivo
        const pathParts = file.name.split('/');
        
        //"nombreCarpeta/nombreVideo"
        const nombreCarpeta = pathParts[0];
        const nombreVideo = pathParts[1];
        
        // Buscar si ya existe la carpeta en el array
        let carpeta = data.find(item => item.nombreCarpeta === nombreCarpeta);
        
        // Si no existe, crear una nueva entrada
        if (!carpeta) {
            carpeta = { nombreCarpeta, videos: [] };
            data.push(carpeta);
        }
        
        // Agregar el video y su URL a la carpeta correspondiente
        carpeta.videos.push({
            nombre: nombreVideo,
            url: `https://storage.googleapis.com/${bucketName}/${file.name}`
        });
    });
    
    return data;
}

async function getProcessSeries() {
    const saveData = await getDataSeries();
    await saveDataSerie(saveData);
}
getProcessSeries();


app.listen(5001, () => {
    console.log('Server is running on http://localhost:5001');
    }
);