// Clase que configura y pone en marcha el servidor.

import express, { Application } from "express"
import mongoose from "mongoose";
import { EmployeeRoutes } from "./routes/employees.routes.js";
import { errorHandler } from "./errorHandler/errorHandler.js";
import { connectDatabase } from "./config/database.js";

class Server {

    // Guarda la aplicación Express creada para este servidor.
    private app:Application;

    constructor(){
        this.app = express()
    }

    
    middlewares(){
        this.app.use(express.json()) // Permite procesar cuerpos JSON enviados en las solicitudes.
    }

    routes(){
        this.app.use("/employees", EmployeeRoutes.routes)

            // Middleware responsable de gestionar los errores de la aplicación.
        this.app.use(errorHandler);
    }

    

    listen() {
        const PORT = process.env.PORT || 3000;
        
        this.app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    }
    
}





const server = new Server();

server.middlewares();
server.routes();

connectDatabase().then(() => {
    server.listen();
});