import { db, auth, storage } from "./firebase-config.js";
import {
    collection, addDoc, getDocs, deleteDoc, updateDoc, doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
    signInWithEmailAndPassword, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// DOM Elements
const loginForm = document.getElementById("login-form");
const loginContainer = document.getElementById("login-container");
const panel = document.getElementById("panel");
const logoutBtn = document.getElementById("logout");

const productForm = document.getElementById("product-form");
const productList = document.getElementById("product-list");

// Auth
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = email.value;
    const password = password.value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        alert("Error al iniciar sesión");
        console.error(err);
    }
});

logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        loginContainer.classList.add("hidden");
        panel.classList.remove("hidden");
        cargarProductos();
    } else {
        loginContainer.classList.remove("hidden");
        panel.classList.add("hidden");
    }
});

// Productos
productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const stock = parseInt(document.getElementById("stock").value);
    const categoria = document.getElementById("categoria").value;
    const modalidad = document.getElementById("modalidad").value;
    const imagen = document.getElementById("imagen").files[0];

    let imagenURL = "";
    if (imagen) {
        const storageRef = ref(storage, `productos/${imagen.name}`);
        await uploadBytes(storageRef, imagen);
        imagenURL = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, "productos"), {
        nombre,
        descripcion,
        precio,
        stock,
        categoria,
        modalidad,
        imagenURL
    });

    productForm.reset();
    cargarProductos();
});

async function cargarProductos() {
    productList.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "productos"));
    querySnapshot.forEach((docSnap) => {
        const p = docSnap.data();
        const div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>${p.descripcion}</p>
      <p><strong>$${p.precio}</strong> - Stock: ${p.stock}</p>
      <p>Modalidad: ${p.modalidad}</p>
      ${p.imagenURL ? `<img src="${p.imagenURL}" width="100" />` : ""}
      <button onclick="eliminarProducto('${docSnap.id}')">Eliminar</button>
    `;
        productList.appendChild(div);
    });
}

window.eliminarProducto = async function (id) {
    await deleteDoc(doc(db, "productos", id));
    cargarProductos();
};
