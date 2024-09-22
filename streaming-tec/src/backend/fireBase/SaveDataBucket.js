const {collection,addDoc,query,where,getDocs} = require('firebase/firestore');
const {db}=require('./fireBaseCredenciales/CredencialesServeFire');

async function validarAudio(nombre) {
    const q = query(collection(db, "streamingtec-audios"), where("nombre", "==", nombre));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
}

async function validarVideo(nombre) {
    const q = query(collection(db, "streamingtec-video"), where("nombre", "==", nombre));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
}

async function validarSerie(nombreCarpeta) {
    const q = query(collection(db, "streamingtec-series"), where("nombreCarpeta", "==", nombreCarpeta));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
}

async function saveDataAudio(audios){
    try {
        for(const audio of audios){
            const validar=await validarAudio(audio.nombre);
            if(!validar){
                await addDoc(collection(db,"streamingtec-audios"),{
                    nombre:audio.nombre,
                    url:audio.url
                });
                console.log("Audios guardados correctamente") 
            }else{
                console.log("El audio ya existe") 
            }
        }
    } catch (error) {
        console.log("No se puede agregar al documento: ",error) 
    }
}

async function saveDataVideo(Videos){
    try {
        for(const video of Videos){
            const validar=await validarVideo(video.nombre);
            if(!validar){
                await addDoc(collection(db,"streamingtec-video"),{
                    nombre:video.nombre,
                    url:video.url
                });
                console.log("Video guardado correctamente") 
            }else{
                console.log("El video ya existe") 
            }
        }
    } catch (error) {
        console.log("No se puede agregar al documento: ",error) 
    }
}

async function saveDataSerie(data){
    const collectionRef = collection(db, 'streamingtec-series'); 
    for (const carpeta of data) {
        const validar=await validarSerie(carpeta.nombreCarpeta);
        try {
            if(!validar){
                // Guardar cada carpeta como un documento en la colección
                await addDoc(collectionRef, {
                    nombreCarpeta: carpeta.nombreCarpeta,
                    videos: carpeta.videos.map(video => ({
                        nombre: video.nombre,
                        url: video.url
                    }))
                });
                console.log(`Carpeta ${carpeta.nombreCarpeta} guardada con éxito.`);
            }else{
                console.log(`La serie ${carpeta.nombreCarpeta} ya existe.`);
            }
        } catch (error) {
            console.error("Error al guardar la carpeta:", error);
        }
    }
}

module.exports = { saveDataAudio, saveDataVideo, saveDataSerie,validarAudio,validarVideo};