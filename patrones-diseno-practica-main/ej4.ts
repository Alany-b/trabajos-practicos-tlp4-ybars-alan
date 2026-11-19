// Ejercicio 4: Adaptación de la interfaz de un inventario antiguo
// Objetivo: Integrar un inventario existente al sistema nuevo usando el patrón Adaptador.

// Crear InventarioViejo con un método llamado agregarItem.
// Declarar la interfaz Inventario que necesita el sistema nuevo, con los métodos agregarEquipo y listarEquipos.
// Implementar AdaptadorInventario para cumplir esa interfaz y hacer compatible InventarioViejo: traducirá internamente las llamadas al método agregarItem cuando se espere un Inventario.
// La salida debería ser:

// const inventarioViejo = new InventarioViejo();
// const adaptador = new AdaptadorInventario(inventarioViejo);
// adaptador.agregarEquipo("Servidor Dell", "Servidor", "disponible");
// console.log(adaptador.listarEquipos());
// // [{ nombre: "Servidor Dell", tipo: "Servidor", estado: "disponible" }]

interface Equipo {
    nombre: string;
    tipo: string;
    estado: string;
}

class InventarioViejo {
    private items: Equipo[] = [];

    agregarItem(nombre: string, tipo: string, estado: string): void {
        this.items.push({
            nombre,
            tipo,
            estado
        });
    }

    listarItems(): Equipo[] {
        return this.items;
    }
}


// Interfaz esperada por el sistema nuevo
interface Inventario {
    agregarEquipo(nombre: string, tipo: string, estado: string): void;
    listarEquipos(): Equipo[];
}


// Adaptador
class AdaptadorInventario implements Inventario {
    private inventarioViejo: InventarioViejo;

    constructor(inventarioViejo: InventarioViejo) {
        this.inventarioViejo = inventarioViejo;
    }

    agregarEquipo(nombre: string, tipo: string, estado: string): void {
        this.inventarioViejo.agregarItem(nombre, tipo, estado);
    }

    listarEquipos(): Equipo[] {
        return this.inventarioViejo.listarItems();
    }
}


// Ejemplo de uso

const inventarioViejo = new InventarioViejo();

const adaptador = new AdaptadorInventario(inventarioViejo);

adaptador.agregarEquipo(
    "Servidor Dell",
    "Servidor",
    "disponible"
);

console.log(adaptador.listarEquipos());