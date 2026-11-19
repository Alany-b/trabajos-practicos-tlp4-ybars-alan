import { Empleado, EmpleadoFijo } from './ej3.ts';

// Esta subclase hereda de Empleado.
class EmpleadoPorHoras extends Empleado {
    private horasTrabajadas: number;
    private valorHora: number;

    constructor(nombre: string, antiguedad: number, horasTrabajadas: number, valorHora: number) {
        // Se pasan los datos requeridos al constructor de la clase base.
        super(nombre, antiguedad); 
        this.horasTrabajadas = horasTrabajadas;
        this.valorHora = valorHora;
    }

    // Se redefine el método para calcular el pago por hora.
    public calcularSueldo(): number {
        return this.horasTrabajadas * this.valorHora;
    }
}

// Esta es otra clase derivada de Empleado.
class EmpleadoPorComision extends Empleado {
    private ventasDelMes: number;
    private porcentajeComision: number;

    constructor(nombre: string, antiguedad: number, ventasDelMes: number, porcentajeComision: number) {
        super(nombre, antiguedad);
        this.ventasDelMes = ventasDelMes;
        this.porcentajeComision = porcentajeComision;
    }

    // El sueldo corresponde a la comisión obtenida por las ventas.
    public calcularSueldo(): number {
        return this.ventasDelMes * (this.porcentajeComision / 100);
    }
}

function calcularNomina(empleados: Empleado[]): number {
    let totalAcumulado = 0;
    
    // Se recorren todos los empleados de la lista.
    for (const emp of empleados) {

        // El polimorfismo permite tratarlos uniformemente como empleados;
        // cada instancia ejecuta su propia versión de calcularSueldo().
        totalAcumulado += emp.calcularSueldo(); 
    }
    return totalAcumulado;
}

console.log("\n--- Probando Ejercicio 4 ---");

const listaDeEmpresas: Empleado[] = [
    new EmpleadoFijo("Carlos", 5, 100000),       
    new EmpleadoPorHoras("Ana", 2, 160, 500),      
    new EmpleadoPorComision("Luis", 1, 500000, 10)  
];

console.log("Detalle individual de la nómina:");
for (const emp of listaDeEmpresas) {
    // Cada instancia usa el método heredado 'describir()' y muestra el sueldo de su propia implementación.
    console.log(" ->", emp.describir());
}

// Se envía la lista de empleados de distintos tipos a la función.
const gastoTotal = calcularNomina(listaDeEmpresas);
console.log(`\nCosto total de la nómina a pagar por la empresa: $${gastoTotal}`); // El total esperado es 240000.
