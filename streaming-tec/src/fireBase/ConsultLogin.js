import appFirebase from './fireBaseCredenciales/Credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut as firebaseSignOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc} from 'firebase/firestore';

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

// Función para registrar usuario
export const registerUser = async (email, password, nombre) => {

    const userDoc = await getDoc(doc(db, 'usuario', email));
    if (userDoc.exists()) {
        throw new Error('El usuario ya existe');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'usuario', user.uid), {
        nombre: nombre,
        correo: email
    });

    return user;
};

// Función para iniciar sesión
export const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async()=>{
    try {
        await firebaseSignOut(auth); 
        console.log("Sesión cerrada correctamente");
    } catch (error) {
        console.error("Error al cerrar la sesión: ", error);
    }
}