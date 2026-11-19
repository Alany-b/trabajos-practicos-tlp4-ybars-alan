import { describe, expect, it } from 'vitest';
import { calcularPrecioFinal } from '../src/services/precios.ts';

describe('calcularPrecioFinal', () => {
  it('aplica un descuento del 10 %', () => {
    expect(calcularPrecioFinal(1000, 10)).toBe(900); // Comprueba que el resultado sea 900.
  });

  it('conserva el precio si el descuento es cero', () => {
    expect(calcularPrecioFinal(1000, 0)).toBe(1000); // Comprueba que el precio no cambie.
  });

  it('rechaza descuentos superiores al 100 %', () => {
    expect(() => calcularPrecioFinal(1000, 150)).toThrow(RangeError); // Verifica que se lance un error.
  });


// Caso de prueba 6
  it('devuelve cero con un descuento del 100 %', () => {
  expect(calcularPrecioFinal(1000, 100)).toBe(0); 
})
// Caso de prueba 7
  it('rechaza precios negativos', () => {
    expect(() => calcularPrecioFinal(-100, 10)).toThrow(RangeError)
  })

  // Caso de prueba 8
  it('rechaza descuentos negativos',() => {
    expect(()=> calcularPrecioFinal(1000, -10)).toThrow(RangeError)
  })

  // Caso de prueba adicional
  it('rechaza NaN como precio', () => {
    expect(() => calcularPrecioFinal(NaN, 10)).toThrow(RangeError)
  })
});
