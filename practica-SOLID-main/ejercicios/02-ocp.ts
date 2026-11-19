// type PaymentType = "card" | "cash";

// class PaymentProcessor {
//   pay(type: PaymentType, amount: number): void {
//     switch (type) {
//       case "card":
//         console.log(`Pagando $${amount} con tarjeta`);
//         break;
//       case "cash":
//         console.log(`Pagando $${amount} en efectivo`);
//         break;
//       default:
//         throw new Error("Medio de pago no soportado");
//     }
//   }
// }

// new PaymentProcessor().pay("card", 100);

// Declarar una interfaz común para los distintos medios de pago.
interface PaymentMethod {
  pay(amount: number): void
}



// Crear una clase por cada alternativa: tarjeta, efectivo y transferencia.

class Card implements PaymentMethod {
  pay(amount:number): void { 
    console.log(`Pagaste $${amount} con tarjeta`)
  }
}

class Cash implements PaymentMethod{
  pay(amount: number): void {
    console.log(`Pagaste $${amount} en efcetivo`)

  }
}

class Transfer {
  pay(amount:number): void {
    console.log(`Pagaste $${amount} por transferencia`)
  }


}
// `PaymentProcessor` recibe un medio de pago y delega en él, sin usar `switch`; así se pueden añadir opciones sin modificar el procesador.
class PaymentProcessor {
  pay(method: PaymentMethod, amount: number): void {
    method.pay(amount)
  }

}



new PaymentProcessor().pay(new Card, 100)
new PaymentProcessor().pay(new Cash, 100)
new PaymentProcessor().pay(new Transfer, 100)
