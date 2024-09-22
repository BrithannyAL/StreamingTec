const express = require('express');
const cors = require('cors')
const app = express();
const {saveDataAudio} = require('./fireBase/SaveDataBucket');
const {collection, getDocs, where,query} = require('firebase/firestore');
const {db}=require('./fireBase/fireBaseCredenciales/CredencialesServeFire');

require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const bucketName = 'streamingtec-audios';

app.use(cors());

//Obtener todo los datos del audio y enviarlos a firebase
async function getDataAudio() {
    const [files]=await storage.bucket(bucketName).getFiles();
    const data= files.map(file=>{
        return{
            title:file.name,
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


//Consultas a Firabase
app.get('/search/:query', async (req, res) => {
    const searchQuery  = req.params.query;

    console.log("SE ESTA BUSCANDO  = "+ searchQuery);
    try {
        const q =  query(collection(db, "streamingtec-audios"), where('nombre', '>=', searchQuery), where('nombre', '<=', searchQuery + '\uf8ff'));
        const snapshot = await getDocs(q)
        if (snapshot.empty) {
            return res.status(404).send('No se encontraron archivos');
        }

        const results = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                title: data.nombre,
                url: data.url
            };
        });

        res.send(results)

    } catch (error) {
        console.log("Error al consultar Firebase: ", error);
        res.status(500).send('Error al consultar Firebase');
    }
});

app.listen(5002, () => {
    console.log('Server is running on http://localhost:5002');
    }
);