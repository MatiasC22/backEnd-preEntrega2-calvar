import express from "express";
import __dirname from "./utils.js";
import handlebars from 'express-handlebars';
import viewsRoutes from './routes/views.routes.js';

import {Server, Socket} from 'socket.io'

const app = express();
const PORT = 9090;

// Midelware de configuracion, son configuraciones del 
// trafico entrante de los puertos

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//---------Configuramos Handlebars ---------------//

app.engine('handlebars',handlebars.engine());
app.set('views', __dirname+ '/views');
app.set('view engine', 'handlebars');


// console.log(__dirname)

// Le indicamos al server que el directorio publico es publico!!
app.use(express.static(__dirname + '/public'));


//---------Ruta de Prueba Parta HBS---






//Enpoint de telemetria , es una forma de saber si el servidor esta arriba 
app.get('/ping',(req,res)=>{
    res.render('index',{});
})

//Routes


app.use("/", viewsRoutes);

const httpServer = app.listen(PORT,()=>{
    console.log(`Server corriendo en el puerto ${PORT}`);
})



// ------------Instanciamos Socket.io------------

const socketServer = new Server(httpServer);


//---- Creamos un Canal de COmunicacion hacia el Cliente

console.log("test 01")

const logs = [];

socketServer.on ('connection', socket =>{
    //Todo LO que sea SOCKET, VA AQUI!!!
    // socket.on('mensaje',data =>{
    //     console.log("Recibido", data);
    //     socket.emit('mensaje', "Hola Soy el Servidor");

    // })

    socket.emit("mensaje_02", "Hola soy el server");

    socket.broadcast.emit('broadcast',"Este evento es para todos los sockets, menos el socket desde que se emitio el mensaje")

    socketServer.emit("evento_ para_ Todos", "Evento PAra todos los Sochets")

    //-------Segunda Parte-----------//

    socket.on('mensaje',data =>{
        // console.log("Recibido", data);
        
        logs.push ({socketId: socket.id, message: data})
        socketServer.emit('logs',{logs});
    })



// console.log("Cliente Prueva 02")


})