const {collection,getDocs,setDoc,arrayUnion,updateDoc,doc,getDoc} = require('firebase/firestore');
const {db}=require('./fireBaseCredenciales/CredencialesServeFire');
const{validarAudio,validarVideo}=require("../fireBase/SaveDataBucket");
const { getAuth, onAuthStateChanged } = require("firebase/auth");

async function validarSerie(nombre) {
    const collectionRef = collection(db, 'streamingtec-series');
    const partes = nombre.split('/'); // Divide la ruta en partes
    const nombreVideo = partes[partes.length - 1];
    
    try {
        const querySnapshot = await getDocs(collectionRef);
        let videoExiste = false;

        querySnapshot.forEach(doc => {
            const { videos } = doc.data();
            if (videos.some(video => video.nombre === nombreVideo)) {
                videoExiste = true;
            }
        });
        
        return videoExiste;
    } catch (error) {
        console.error("Error al verificar si el video existe:", error);
    }
}

async function SaveFavorite(nombre, url) {
    const auth = getAuth();

    // verificar si el usuario esta logueado
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid; 
            const userDocRef = doc(db, 'favorite', uid); 

            // Concurrente
            const [video, serie, audio] = await Promise.all([
                validarVideo(nombre),
                validarSerie(nombre),
                validarAudio(nombre)
            ]);

            // Verificar si el usuario tiene favoritos
            const userDocSnap = await getDoc(userDocRef);

            const addFavorite = async (seccion) => {
                const nuevoFavorito = {
                    seccion:seccion,
                    nombreVideo: nombre,
                    url: url
                };

                if (userDocSnap.exists()) {
                    // Existe documento, actualizar el array 
                    await updateDoc(userDocRef, {
                        miLista: arrayUnion(nuevoFavorito)
                    });
                } else {
                    // No existe documento, crear el array
                    await setDoc(userDocRef, {
                        userId: uid,
                        miLista: [nuevoFavorito]
                    });
                }
            };

            const favoriteExists = userDocSnap.exists() && userDocSnap.data().miLista.some(fav => fav.nombreVideo === nombre);

            if (!favoriteExists) {
                if (video) {
                    try {
                        await addFavorite('videos');
                        alert(`Video ${nombre} agregado a la lista de favoritos.`);
                    } catch (error) {
                        alert("No se puede agregar el video a favoritos, hubo un error.");
                    }
                } else if (audio){
                    try {
                        await addFavorite('audios');
                        alert(`Canción ${nombre} agregado a la lista de favoritos.`);
                    } catch (error) {
                        alert("No se puede agregar el video a favoritos, hubo un error.");
                    }
                } else if(serie){
                    try {
                        await addFavorite('series');
                        alert(`Serie ${nombre} agregado a la lista de favoritos.`);
                    } catch (error) {
                        alert("No se puede agregar la seria a favoritos.");
                    }
                } else{
                    alert("No existe ningún dato referente al seleccionado")
                }
            } else {
                alert("Ya fue agregado a tu lista de favoritos");
            }        
       
        } else {
            alert("Debes estar logueado para agregar a favoritos.");
        }
    });
}

async function getFavorite() {
    const auth = getAuth();

    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid; 
                const userDocRef = doc(db, 'favorite', uid); 

                try {
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        // Devuelve la lista de favoritos
                        resolve(userDocSnap.data().miLista);
                    } else {
                        // El usuario no tiene favoritos
                        resolve([]);
                    }
                } catch (error) {
                    console.error("Error al obtener los favoritos:", error);
                    reject(error);
                }
            } else {
                reject("Usuario no autenticado.");
            }
        });
    });
}

module.exports = {SaveFavorite,getFavorite};