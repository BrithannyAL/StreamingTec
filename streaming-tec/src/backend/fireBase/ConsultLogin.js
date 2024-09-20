import appFirebase from './fireBaseCredenciales/Credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

// Función para registrar usuario
export const registerUser = async (email, password, nombre) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar nombre y correo en Firestore
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
