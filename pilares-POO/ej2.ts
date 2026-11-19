class CuentaBancaria {
    // 'readonly' permite asignar esta propiedad al inicializar la instancia, pero impide cambiarla después.
    // Es pública para que se pueda consultar el nombre del titular, sin permitir que se lo modifique.
    public readonly titular: string; 
    
    // 'private' restringe la lectura y modificación de estos campos al interior de la clase.
    private saldo: number;
    private historial: string[]; 

    constructor(titular: string, montoInicial: number) {
        this.titular = titular;
        this.saldo = montoInicial;
        // El historial comienza con el registro de apertura de la cuenta.
        this.historial = [`Apertura de cuenta con: +${montoInicial}`];
    }


    public depositar(monto: number): void {  // ': void' indica que el método no devuelve un valor.
        if (monto <= 0) {
            throw new Error("El monto a depositar tiene que ser mayor a $0.");
        }
        this.saldo += monto; // Si la validación pasa, se actualiza el saldo privado.
        this.historial.push(`depósito: +${monto}`); // Se agrega el movimiento al historial.
    }

    public retirar(monto: number): void {
        if (monto <= 0) {
            throw new Error("El monto a retirar tiene que ser mayor a $0.");
        }
        if (monto > this.saldo) {
            throw new Error("Fondos insuficientes. No podés sacar más de lo que tenés.");
        }
        this.saldo -= monto;
        this.historial.push(`retiro: -${monto}`);
    }

    // Este método permite consultar el saldo, que no es accesible directamente desde fuera,
    // sin conceder permiso para modificarlo.

    // Devuelve únicamente el valor del saldo para que pueda consultarse de forma segura.
    public consultarSaldo(): number {
        return this.saldo;
    }

    // Devolver 'this.historial' directamente expondría su referencia en memoria.
    // Así, alguien desde fuera podría modificar el historial privado, por ejemplo, con '.push()'.

    // Compartir el arreglo original permitiría que quien lo recibe altere el historial (por ejemplo, con '.push()').
    public obtenerHistorial(): string[] {
        // El operador spread crea una copia del arreglo y evita exponer el original.
        return [...this.historial]; 
    }
}

try {
    console.log("\n--- Probando Ejercicio 2 ---");
    const miCuenta = new CuentaBancaria("Sofía", 5000);
    
    miCuenta.depositar(2000); 
    miCuenta.retirar(1000);
    console.log(`Saldo actual de ${miCuenta.titular}: $${miCuenta.consultarSaldo()}`); 


    const historialClonado = miCuenta.obtenerHistorial();
    historialClonado.push("depósito fantasma: +999999"); 

    console.log("Historial real en el banco:", miCuenta.obtenerHistorial()); 
    
    miCuenta.retirar(15000); 
} catch (error: any) {
    console.log("Alerta del banco:", error.message);
}
