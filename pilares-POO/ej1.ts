// Abstraer consiste en quedarse con lo relevante del problema: en una venta importa el precio del teclado y si hay unidades disponibles, no el color o el material de su embalaje.

// Una clase describe la estructura y las instrucciones para crear sus objetos.
class Producto {
    // Indico cuáles son los datos necesarios del producto.
    public nombre: string;
    public precio: number;
    public categoria: string;
    public stock: number;

     // El constructor se ejecuta una vez al crear el objeto con 'new'.
    // Allí se reciben los valores obligatorios para inicializarlo.
    constructor(nombre: string, precio: number, categoria: string, stock: number) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.stock = stock;

        // 'this' hace referencia a la instancia actual, que se crea a partir de la clase.
        // Por ejemplo, 'this.nombre' identifica la propiedad de esta instancia y le asigna
        // el valor recibido en el parámetro 'nombre' (a la derecha del signo igual).
    }

     // Un método es una función de la clase que representa una acción que puede realizar el objeto.

    // Este método reúne el formato usado para presentar la información del producto.
    public describir(): string { // public permite acceder al miembro desde fuera de la clase.
        return `${this.nombre} (${this.categoria}): $${this.precio} — ${this.stock} unidades`; // 'this' lee los valores de esta instancia.
    }

    public hayStock(cantidad: number): boolean {
        return this.stock >= cantidad;
    }

    public venderUnidades(cantidad: number): void {
        if (this.hayStock(cantidad)) {
            this.stock -= cantidad;
        } else {
            
            throw new Error(`No hay stock suficiente de ${this.nombre}.`);
        }
    }

    public aplicarDescuento(porcentaje: number): number {
        const descuento = (this.precio * porcentaje) / 100;
        return this.precio - descuento;
    }
}

try {
    console.log("--- Probando Ejercicio 1 ---");
    const prod1 = new Producto("Teclado", 10000, "electrónica", 5);
    console.log(prod1.describir()); // Muestra los datos iniciales.

    console.log("¿Hay stock para llevar 3?:", prod1.hayStock(3)); // El resultado esperado es true.
    prod1.venderUnidades(3); 
    console.log("Luego de la venta:", prod1.describir()); // Quedan 2 unidades disponibles.

    // Verificamos el cálculo de un descuento sin modificar el precio original.
    const precioConDescuento = prod1.aplicarDescuento(10);
    console.log(`Precio con 10% OFF: $${precioConDescuento}`); // El precio calculado es 9000.
    console.log(`Precio en etiqueta real: $${prod1.precio}`); // El precio guardado permanece en 10000.

    // Provocamos una excepción para comprobar la validación del stock.
    console.log("\nIntentando vender 5 unidades más (solo quedan 2)...");
    prod1.venderUnidades(5); 
} catch (error: any) {
    // La excepción se captura aquí y evita que el programa se interrumpa.
    console.log("Capturamos el problema con éxito:", error.message);
}
