// Ejercicio 2: Creación de equipos mediante el patrón Factory Method
// Objetivo: Aplicar Factory Method para generar distintas clases de equipos.

// Definir EquipoFactory con crearEquipo, que seleccione y devuelva una instancia según el tipo indicado ("Notebook", "Desktop" o "Servidor").

// Definir una clase concreta para cada equipo (Notebook, Desktop y Servidor), con propiedades propias como la RAM y el procesador.

// Las clases concretas heredarán de una clase abstracta que declare detalles(); así crearEquipo podrá devolver un tipo común independientemente de cuál instancie.
// La salida debería tener este formato:

// const factory = new EquipoFactory();
// const Notebook = factory.crearEquipo("Notebook", "Dell XPS", "16GB", "i7");
// console.log(Notebook.detalles());
// Tipo: Notebook, Nombre: Dell XPS, RAM: 16GB, Procesador: i7

abstract class Equipo {
    nombre: string;
    ram: string;
    procesador: string;

    constructor(
        nombre: string,
        ram: string,
        procesador: string
    ) {
        this.nombre = nombre,
        this.procesador = procesador,
        this.ram = ram
    }

    abstract detalles(): string
}

class Notebook extends Equipo{

    detalles(): string{
        return (`Tipo: Notebook, Nombre: ${this.nombre}, Ram: ${this.ram}, Procesador: ${this.procesador}`)
    }
}

class Desktop extends Equipo{

    detalles(): string{
        return (`Tipo: Desktop, Nombre: ${this.nombre}, Ram: ${this.ram}, Procesador: ${this.procesador}`)
    }
}

class Servidor extends Equipo{

    detalles(): string{
        return(`Tipo: Servidor, Nombre: ${this.nombre}, Ram: ${this.ram}, Procesador: ${this.procesador}`)
    }
}

class EquipoFactory {

    crearEquipo( 
        tipo: string,
        nombre: string,
        ram: string,
        procesador: string,
    ): Equipo{

        if (tipo === "Notebook") {
            return new Notebook(nombre, ram, procesador)
        } else 
            if (tipo === "Desktop") {
                return new Desktop(nombre, ram, procesador)
            } else 
                if (tipo === "Servidor") {
                    return new Servidor(nombre, ram, procesador)
                } else {
                    throw new Error("Tipo de equipo no válido")
                }

    }
}



const factory = new EquipoFactory();
const notebook = factory.crearEquipo("Notebook", "Dell XPS", "16GB", "i7");
console.log(notebook.detalles());