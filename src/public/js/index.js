

const socket = io();

socket.emit("mensaje","Hola Soy el Cliente")

socket.on("mensaje_02", data =>{
    console.log("recibido", data);
})


socket.on('broadcast', data =>{
    console.log("recibido", data);
})

socket.on("evento_ para_ Todos", data =>{
    console.log("evento_ para_ Todos", data);
})