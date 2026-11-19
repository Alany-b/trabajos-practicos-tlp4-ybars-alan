// Ejercicio 3: Seguimiento de estados con el patrón Observer
// Objetivo: Notificar al área de soporte cada vez que cambie el estado de un equipo.

// Crear Soporte como observador para recibir avisos ante cambios en el estado de un equipo.

// Implementar Equipo para registrar observadores y avisarles cuando se modifique su estado.

// Crear la interfaz Observador con un método de notificación. Equipo dependerá de ella en lugar de la clase Soporte concreta, lo que permitirá sumar otros observadores (correo, registro, etc.) sin cambiar Equipo.

// La salida esperada es:
// const soporte = new Soporte();
// const equipo = new Equipo("Notebook HP", "Portátil", "disponible");
// equipo.agregarObservador(soporte);
// equipo.cambiarEstado("en reparación");

// Soporte notificado: Notebook HP ha cambiado su estado a en reparación.

interface Observador {
    actualizar(nombre: string, estado: string): void;
}

class Soporte implements Observador {
    actualizar(nombre: string, estado: string): void {
        console.log(
            `Soporte notificado: ${nombre} ha cambiado su estado a ${estado}.`
        );
    }
}

class Equipo {
    nombre: string;
    tipo: string;
    estado: string;

    private observadores: Observador[] = [];

    constructor(nombre: string, tipo: string, estado: string) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.estado = estado;
    }

    agregarObservador(observador: Observador): void {
        this.observadores.push(observador);
    }

    cambiarEstado(nuevoEstado: string): void {
        this.estado = nuevoEstado;

        for (const observador of this.observadores) {
            observador.actualizar(this.nombre, this.estado);
        }
    }
}


// Ejemplo de uso

const soporte = new Soporte();

const equipo = new Equipo(
    "Notebook HP",
    "Portátil",
    "disponible"
);

equipo.agregarObservador(soporte);

equipo.cambiarEstado("en reparación");