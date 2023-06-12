//--------------------DIRNAME----------------------------------------
import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
// Es necesario escribir estos import y export para que funcione la variable global dirname, que es la que me indica donde esta ubicado el proyecto.

//--------------------MULTER----------------------------------------
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public");//Si public esta fuera del src, tengo que borrar el dirname y la barra de public.
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });

//--------------------A----------------------------------------


