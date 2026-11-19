class Persona {
    private readonly _dni: string;
    public nombre: string;
    
    private _edad: number = 0;
    private _email: string = "";

    constructor(dni: string, nombre: string) {
        this._dni = dni;
        this.nombre = nombre;
    }

    // Un getter permite consultar desde fuera el valor de una propiedad privada.
    // Se accede como a una propiedad común ('persona.edad'), sin llamarlo como función.
    public get edad(): number {
        return this._edad; // Devuelve el valor privado para su consulta.
    }

    // Un setter intercepta las asignaciones externas, como 'persona.edad = 25',
    // para validar el valor antes de guardarlo.
    public set edad(valor: number) {
        if (valor < 0 || valor > 120) {
            throw new Error("Edad imposible. Debe estar entre 0 y 120 años.");
        }
        this._edad = valor;
    }

    // Permite consultar el correo privado.
    public get email(): string {
        return this._email;
    }

    // Comprueba el formato del correo antes de almacenarlo.
    public set email(valor: string) {
        if (!valor.includes("@")) {
            throw new Error("Formato inválido. Todo email necesita llevar un '@'.");
        }
        this._email = valor;
    }

    // PROPIEDAD CALCULADA (solo lectura): este getter no tiene un setter asociado,
    // por lo que no se puede asignar 'persona.esMayorDeEdad = true'. El resultado booleano
    // se calcula cada vez que se consulta, en lugar de almacenarse.
    public get esMayorDeEdad(): boolean {
        return this._edad >= 18;
    }

    // Este getter de solo lectura prepara información pública para compartir
    // sin revelar datos sensibles, como el DNI o el correo electrónico.
    public get datosPublicos(): string {
        return `[PÚBLICO] Nombre: ${this.nombre} | Mayor de edad: ${this.esMayorDeEdad ? 'Sí' : 'No'}`;
    }
}

try {
    console.log("\n--- Probando Ejercicio 5 ---");
    const alguien = new Persona("35.123.456", "Agustín");
    
    // GUARDAR DATOS: Aunque parecen asignaciones directas, TypeScript invoca
    // automáticamente los setters 'edad' y 'email'.
    alguien.edad = 25;       
    alguien.email = "agustin@correo.com"; 

    // LEER DATOS: El acceso parece una lectura de propiedad, pero ejecuta los getters correspondientes.
    console.log("Edad cargada:", alguien.edad);
    console.log("¿Es mayor de edad?:", alguien.esMayorDeEdad); // Ejecuta el getter calculado.
    console.log(alguien.datosPublicos); // Ejecuta el getter que filtra los datos públicos.

    // Se intenta guardar un valor inválido para comprobar la validación del setter.
    console.log("\nIntentando cambiar el mail por uno inválido...");
    alguien.email = "agustincorreo.com"; // La asignación fallará y el error llegará al 'catch'.

} catch (error: any) {
    console.log("Validación activada:", error.message);
}
