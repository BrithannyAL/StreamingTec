const express = require('express');
const cors = require('cors')
const app = express();
const {saveDataSerie} = require('./fireBase/SaveDataBucket');
const {collection, getDocs, where,query} = require('firebase/firestore');
const {db}=require('./fireBase/fireBaseCredenciales/CredencialesServeFire');

require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const bucketName = 'streamingtec-series';

app.use(cors());

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

//Consultas a Firabase
app.get('/search/:query', async (req, res) => {
    const searchQuery = req.params.query;

    console.log("SE ESTA BUSCANDO  = " + searchQuery);
    try {
        // Se obtiene todas las series que coincidan con el nombre de la serie buscada
        const q = query(collection(db, "streamingtec-series"), where('nombreCarpeta', '==', searchQuery));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return res.status(404).send('No se encontraron archivos');
        }

        const results = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                nombreCarpeta: data.nombreCarpeta,
                videos: data.videos 
            };
        });

        res.send(results);

    } catch (error) {
        console.log("Error al consultar Firebase: ", error);
        res.status(500).send('Error al consultar Firebase');
    }
});

app.listen(5001, () => {
    console.log('Server is running on http://localhost:5001');
    }
);