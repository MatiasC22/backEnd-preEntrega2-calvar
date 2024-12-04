import {fileURLToPath} from 'url';
import { dirname } from 'path';



/*fileURLToPath: Esta Funcion gartantiza la decodificacion correcta
de los caracteres codificados en porcentaje, asi como una cadena de ruta absoluta
valida Multiples Formas.*/

/* dirname: Devuelve el nobre del directorio de una ruta.
Similar al comando dirname de Unix.*/ 


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

export default __dirname;

