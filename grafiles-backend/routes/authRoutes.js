const express = require('express');

const multer = require('multer');
const { register, login, getUsers } = require('../controllers/authController');
const { getDirectorios } = require('../controllers/dirController');
const { newDirectorio } = require('../controllers/dirController');
const verifyToken = require('../middleware/authMiddleware');
const { getFiles , newRoot} = require('../controllers/fileController');
const File = require('../models/fileModel');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/register', register);
router.post('/login', login);

router.get('/directorios', getDirectorios);
router.post('/newDir', newDirectorio);

router.get('/getUsers', getUsers)

router.get('/files', getFiles);
router.post('/newRoot', newRoot)
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        // Comprobar si el archivo está presente
        if (!req.file) {
            return res.status(400).json({ message: 'No se ha cargado ningún archivo.' });
        }

        // Comprobar si dir_id está presente
        if (!req.body.dir_id) {
            return res.status(400).json({ message: 'ID de la carpeta es requerido.' });
        }

        if (req.file.mimetype.startsWith('image/')) {
            // Si es una imagen, almacena el buffer directamente
            content = req.file.buffer;
        } else {
            // Si es texto, conviértelo a Buffer
            content = Buffer.from(req.file.buffer.toString(), 'utf-8');
        }


        // Crear un nuevo archivo
        const newFile = new File({
            name: req.file.originalname,
            dir_id: req.body.dir_id, // Obtener el ID de la carpeta del cuerpo de la solicitud
            size: req.file.size, // Tamaño del archivo
            content: content,
            tipo: req.file.mimetype, // Tipo de archivo
        });

        await newFile.save();
        res.status(200).json({ message: 'Archivo subido exitosamente.' });
    } catch (error) {

        if (error.code === 11000) {
            res.status(409).json({ message: 'Ya existe un archivo con el mismo nombre en este directorio.' });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Error al subir el archivo.' });
        }
    }
});


router.get('/home', verifyToken, (req, res) => {
    res.send('Bienvenido a la página de inicio');
});

module.exports = router;
