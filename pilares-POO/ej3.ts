

export class Empleado {
    // 'protected' oculta los campos frente al código externo, como 'private',
    // pero también permite que las clases derivadas accedan a ellos.
    protected nombre: string;
    protected antiguedad: number; 

    constructor(nombre: string, antiguedad: number) {
        this.nombre = nombre;
        this.antiguedad = antiguedad;
    }

    // La clase base 'Empleado' no define una fórmula específica de sueldo para cada trabajador.
    // Por eso devuelve 0; las clases derivadas reemplazarán este cálculo según corresponda.

    // El cálculo predeterminado es 0 y cada subclase puede implementar su propia fórmula.
    public calcularSueldo(): number {
        return 0; 
    }

    // Al invocar 'this.calcularSueldo()', 'describir()' usa la implementación correspondiente
    // a la clase concreta de la instancia, en lugar del cálculo predeterminado de la clase base.

    // Este método combina los datos del empleado para mostrarlos, consultando los valores de esta instancia mediante 'this'.
    public describir(): string {
        return `${this.nombre} (${this.antiguedad} años de antigüedad) — sueldo: $${this.calcularSueldo()}`;
    }
}

// 'extends' hace que EmpleadoFijo herede las propiedades y los métodos de Empleado.
export class EmpleadoFijo extends Empleado {
    private sueldoBase: number; // Este campo pertenece únicamente a los empleados fijos.

    constructor(nombre: string, antiguedad: number, sueldoBase: number) {
        // 'super()' invoca el constructor de la clase padre (Empleado).
        // Es necesario pasarle el nombre y la antigüedad para que pueda inicializar esos campos.

        // Se llama al constructor de Empleado para guardar el nombre y la antigüedad heredados.
        super(nombre, antiguedad); 

        // Después de inicializar la clase base, se asigna el dato propio de esta subclase.
        this.sueldoBase = sueldoBase; 
    }

    // SOBRESCRITURA (override): Se redefine un método heredado para sustituir
    // su comportamiento original (el 'return 0') por la fórmula de esta subclase.

    // Aquí se reemplaza el cálculo de sueldo de la clase base por el de esta subclase.
    public calcularSueldo(): number {
        const bonoAntiguedad = this.sueldoBase * 0.02 * this.antiguedad;
        return this.sueldoBase + bonoAntiguedad;
    }
}

console.log("\n--- Probando Ejercicio 3 ---");
const juan = new EmpleadoFijo("Juan", 3, 50000);
console.log(juan.describir()); 
