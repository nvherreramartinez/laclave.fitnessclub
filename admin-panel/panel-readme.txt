🛠️ Panel de Administración de Productos — Firebase
Este panel permite a un usuario autenticado agregar, visualizar, eliminar y gestionar productos, incluyendo imágenes, a través de una interfaz web. Todos los datos se almacenan en Firebase Firestore y las imágenes en Firebase Storage.

⚙️ Requisitos previos
Antes de usar el panel, asegurate de tener:

Una cuenta en Firebase.

Un proyecto creado en la consola de Firebase.

Habilitados los siguientes servicios:

Authentication → método: Correo y contraseña

Cloud Firestore

Firebase Storage

🔑 Crear un usuario administrador
Desde Firebase Console → Authentication → Pestaña “Usuarios”.

Hacer clic en Agregar usuario.

Ingresar un correo y contraseña que se usará para acceder al panel.

📁 Estructura del proyecto
arduino
Copiar
Editar
/admin-panel
├── index.html            // Interfaz de login y gestión
├── style.css             // Estilos del panel
├── app.js                // Lógica de autenticación y CRUD de productos
└── firebase-config.js    // Configuración del proyecto Firebase
🧩 Configuración
1. Reemplazar datos de Firebase
Abrí el archivo firebase-config.js y reemplazá los valores de firebaseConfig por los tuyos.
Los encontrás en Firebase Console → ⚙️ Configuración del proyecto → pestaña "General" → sección “Tus apps” → Configurar Firebase SDK para la Web.

js
Copiar
Editar
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT.firebaseapp.com",
  projectId: "TU_PROJECT",
  storageBucket: "TU_PROJECT.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};
🚀 Uso del panel
1. Abrir el archivo index.html en el navegador.
⚠️ Importante: este panel usa módulos ES6, así que se debe abrir desde un servidor local o remoto (no directamente con doble clic).
Podés usar Live Server en VS Code o correr un servidor con Python/Node.

2. Iniciar sesión
Ingresá el correo y contraseña del usuario administrador creado desde Firebase Console.

3. Agregar un producto
Completá el formulario:

Nombre

Descripción

Precio

Stock

Categoría

Modalidad (Presencial / Online)

Imagen (opcional)

Luego hacé clic en Guardar producto.

4. Ver productos existentes
Debajo del formulario se mostrarán todos los productos cargados con sus datos e imagen (si tiene).

5. Eliminar productos
Cada tarjeta de producto tiene un botón "Eliminar" que permite quitarlo de Firestore.

🔐 Seguridad y Acceso
Solo usuarios autenticados pueden acceder al panel y gestionar productos.

Las reglas de Firebase Firestore y Storage deberían limitar el acceso a usuarios autenticados.

📜 Reglas recomendadas de seguridad
Firestore:
js
Copiar
Editar
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /productos/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
Storage:
js
Copiar
Editar
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /productos/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
📦 Extensiones sugeridas (futuro)
✏️ Edición de productos

🧑‍🤝‍🧑 Roles: múltiples usuarios con permisos diferenciados

🧭 Filtros por categoría o modalidad

📦 Exportar lista a Excel o PDF

❓Preguntas frecuentes
¿El cliente necesita instalar algo?
No. Solo necesita acceder al archivo index.html desde un navegador, preferentemente a través de un hosting o servidor local.

¿Se pueden subir varias imágenes por producto?
Actualmente solo una. Se puede ampliar.

¿Qué pasa si se actualiza Firebase?
Este proyecto usa Firebase Modular SDK 10+, actualizado al momento del desarrollo. Si Firebase cambia sus rutas o métodos en el futuro, puede requerir ajustes menores en el código.