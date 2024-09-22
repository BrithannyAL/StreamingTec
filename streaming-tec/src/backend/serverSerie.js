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
const bucket = storage.bucket(bucketName);

app.use(cors());

// Obtener 9 videos de series aleatorias desde Google Cloud Storage
app.get('/random-series', async (req, res) => {
    try {
        const [files] = await bucket.getFiles();
        
        if (files.length === 0) {
            return res.status(404).send('No se encontraron archivos');
        }

        // Agrupar los archivos por carpeta
        const seriesMap = files.reduce((acc, file) => {
            const pathParts = file.name.split('/');
            const folderName = pathParts[0];
            if (!acc[folderName]) {
                acc[folderName] = [];
            }
            acc[folderName].push(file);
            return acc;
        }, {});

        const seriesFolders = Object.keys(seriesMap);
        const selectedVideos = [];

        while (selectedVideos.length < 9 && seriesFolders.length > 0) {
            // Seleccionar una carpeta aleatoria
            const randomFolderIndex = Math.floor(Math.random() * seriesFolders.length);
            const randomFolder = seriesFolders[randomFolderIndex];
            const videosInFolder = seriesMap[randomFolder];

            // Seleccionar 3 videos aleatorios de la carpeta seleccionada
            const shuffledVideos = videosInFolder.sort(() => 0.5 - Math.random());
            const selectedFolderVideos = shuffledVideos.slice(0, 3);

            selectedVideos.push(...selectedFolderVideos);

            // Eliminar la carpeta seleccionada para no seleccionarla de nuevo
            seriesFolders.splice(randomFolderIndex, 1);
        }

        const results = selectedVideos.slice(0, 9).map(file => {
            return {
                title: file.name,
                url: `https://storage.googleapis.com/${bucketName}/${file.name}`
            }
        });

        res.send(results);
        console.log(selectedVideos);

    } catch (error) {
        console.log("Error al obtener videos de series aleatorias: ", error);
        res.status(500).send('Error al obtener videos de series aleatorias');
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

        // Procesar los resultados para extraer los capítulos
        const results = [];
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            if (data.videos && Array.isArray(data.videos)) {
                data.videos.forEach(video => {
                    results.push({
                        title: video.nombre,
                        url: video.url
                    });
                });
            }
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