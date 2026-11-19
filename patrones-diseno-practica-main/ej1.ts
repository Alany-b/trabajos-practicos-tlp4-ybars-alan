// Declaro la interfaz Equipo para establecer el tipo de los equipos.

interface Equipo {
    nombre: string;
    tipo: string;
    estado: string;
}

class Inventario{
    equipos: Equipo[] = []

    private static instancia: Inventario;
    private constructor() {
    }

    public static obtenerInstancia(): Inventario {
        if (!Inventario.instancia){
            Inventario.instancia = new Inventario()
        }
        return Inventario.instancia;
    }


    // Incorporar agregarEquipo para registrar equipos y listarEquipos para obtener todos los que se hayan agregado.

    agregarEquipo(nombre: string, tipo: string, estado: string){
        const nuevoEquipo = {
            nombre, 
            tipo, 
            estado
        }
        this.equipos.push(nuevoEquipo)
    }

    listarEquipos(){
        return this.equipos
    }
}

const inventario = Inventario.obtenerInstancia();
inventario.agregarEquipo("Notebook HP", "Portátil", "disponible");
console.log(inventario.listarEquipos());
// [{ nombre: "Notebook HP", tipo: "Portátil", estado: "disponible" }]
