
import  router  from './routes/itemesroute.js'; // Importamos las rutas de los items
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Para cargar las variables de entorno desde el archivo .env

// LO NUEVO
import path from 'path'; 
import { fileURLToPath } from "url";

// import env from 'env-var';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

// Inicializamos la aplicación Express
const app = express();
//app.use(cors()); // Habilitar CORS para permitir peticiones de otros orígenes

// NUEVA PARTE
// Middleware para configurar CORS manualmente
app.use(cors())

/*app.use((req, res, next) => {
  // Permite solicitudes de todos los orígenes
  res.header('Access-Control-Allow-Origin', '*');  

  // Define los métodos HTTP permitidos
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // Especifica las cabeceras que pueden ser enviadas con la solicitud
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  // Si la solicitud es de tipo OPTIONS, respondemos con un código 200 (éxito) para que el navegador pueda proceder
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Si no es una solicitud OPTIONS, continúa con la siguiente capa de middleware o ruta
  next();
});*/

app.use(express.json()); // Parsear JSON en las solicitudes entrantes

// const DB_URL= env.get('DB_URL').required().asString();
const PORT = process.env.PORT || 5000; // Puerto donde correrá el servidor
const DB_URI = process.env.DB_URL; // URL de conexión a la base de datos (definida en .env)'

//NUEVO

// Configurar __dirname para ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conectamos a la base de datos de MongoDB // AGREGUE process.env.
mongoose.connect(process.env.DB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true })
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.log('Error al conectar a la base de datos: ', err));

// Importamos las rutas del CRUD para los items

// NUEVO

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
}); // hasta aqui

app.use('/api/items', router); // Definimos las rutas para gestionar los items

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  
});

