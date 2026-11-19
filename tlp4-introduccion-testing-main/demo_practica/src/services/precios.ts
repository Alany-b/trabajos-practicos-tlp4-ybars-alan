/** Obtiene el precio final después de aplicar un descuento porcentual. */
export function calcularPrecioFinal(precio: number, descuento: number): number {

// - El descuento debe ser finito y estar dentro del intervalo de 0 a 100, incluidos ambos extremos.
// - Si algún valor no es válido, se debe lanzar un `RangeError`.
  if (!Number.isFinite(descuento) || descuento < 0 || descuento > 100){
    throw new RangeError("El descuento que se quiere aplicar es inválido")
  }
// - El precio debe ser finito y no puede ser menor que cero.

  if (!Number.isFinite(precio) || precio < 0){
    throw new RangeError("El precio ingresado es inválido")
  }
  return precio - (precio * descuento) / 100; 
}
