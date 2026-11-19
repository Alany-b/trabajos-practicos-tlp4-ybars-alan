# Trabajos Prácticos — Taller de Lenguajes de Programación IV

**Alumno:** Alan Ybars

Repositorio que reúne las prácticas desarrolladas en **TypeScript** para la materia *Taller de Lenguajes de Programación IV*. Cada carpeta es un trabajo independiente y aborda un tema distinto del diseño de software: desde los fundamentos de la programación orientada a objetos hasta la refactorización de una API real y la automatización de pruebas.

El objetivo general es aprender a escribir código **mantenible, testeable y bien estructurado**, aplicando principios de diseño y buenas prácticas sobre ejemplos concretos.

---

## Contenido del repositorio

| Carpeta | Tema | Tecnologías |
| --- | --- | --- |
| [`pilares-POO`](./pilares-POO) | Los 4 pilares de la POO | TypeScript, Node.js |
| [`patrones-diseno-practica-main`](./patrones-diseno-practica-main) | Patrones de diseño | TypeScript, Node.js |
| [`practica-SOLID-main`](./practica-SOLID-main) | Principios SOLID | TypeScript, Node.js |
| [`refactorizacionServidorExpress-main`](./refactorizacionServidorExpress-main) | Refactorización de una API con arquitectura por capas | Express, MongoDB, Mongoose, Docker |
| [`tlp4-introduccion-testing-main`](./tlp4-introduccion-testing-main) | Calidad y pruebas automatizadas | Express, Vitest, Supertest, GitHub Actions |

---

## 1. `pilares-POO` — Fundamentos de la programación orientada a objetos

Cinco ejercicios introductorios, cada uno enfocado en un concepto central de la POO:

- **Abstracción y clases** (`ej1.ts`): modelo de un `Producto` con stock, ventas, validaciones y cálculo de descuentos. Se practica el uso de `this`, métodos, propiedades y manejo de errores con `try/catch`.
- **Encapsulamiento** (`ej2.ts`): una `CuentaBancaria` con saldo e historial privados. Se protege el estado interno mediante métodos públicos, `readonly` y copias defensivas del historial.
- **Herencia** (`ej3.ts`): clase base `Empleado` y subclase `EmpleadoFijo`, con `extends`, `super()` y sobrescritura de métodos.
- **Polimorfismo** (`ej4.ts`): distintos tipos de empleado (fijo, por horas, por comisión) que calculan su sueldo de forma propia; una misma función `calcularNomina` los trata a todos por igual.
- **Getters y setters** (`ej5.ts`): la clase `Persona` valida edad y email antes de guardarlos y expone propiedades calculadas de solo lectura.

**Ejecutar:** `npm install` y luego `npm run ej1` … `npm run ej5`.

---

## 2. `patrones-diseno-practica-main` — Patrones de diseño

Implementaciones de patrones clásicos sobre un mismo dominio: la gestión de un inventario de equipos.

- **Singleton** (`ej1.ts`): `Inventario` garantiza una única instancia compartida mediante un constructor privado y un método estático `obtenerInstancia()`.
- **Factory Method** (`ej2.ts`): `EquipoFactory` crea `Notebook`, `Desktop` o `Servidor` a partir de un tipo, devolviendo siempre un tipo común (`Equipo`) sin que el cliente conozca las clases concretas.
- **Observer** (`ej3.ts`): un `Equipo` notifica automáticamente a sus observadores (por ejemplo, `Soporte`) cada vez que cambia de estado, dependiendo de una interfaz y no de clases concretas.
- **Adapter** (`ej4.ts`): `AdaptadorInventario` conecta un inventario antiguo (`agregarItem` / `listarItems`) con la interfaz nueva (`agregarEquipo` / `listarEquipos`) sin modificar el código legado.

**Ejecutar:** `npm install` y luego `npm run ej1` … `npm run ej4`.

---

## 3. `practica-SOLID-main` — Principios SOLID

Cinco ejercicios donde se parte de un código que funciona pero está mal diseñado, y se lo refactoriza aplicando un principio por archivo. Cada ejercicio incluye las preguntas de análisis respondidas como comentarios.

- **SRP — Responsabilidad única** (`01-srp.ts`): se divide `UserManager` en `UserValidator`, `UserRepository`, `EmailService` y `UserRegistrationService`.
- **OCP — Abierto/cerrado** (`02-ocp.ts`): se reemplaza el `switch` de `PaymentProcessor` por una interfaz `PaymentMethod` y una clase por medio de pago (tarjeta, efectivo, transferencia).
- **LSP — Sustitución de Liskov** (`03-lsp.ts`): se elimina la herencia incorrecta entre `Square` y `Rectangle` y se modela un contrato común `Shape`.
- **ISP — Segregación de interfaces** (`04-isp.ts`): la interfaz `MultifunctionPrinter` se separa en `Printer`, `Scanner` y `Fax`, de modo que `SimplePrinter` solo implementa lo que realmente puede hacer.
- **DIP — Inversión de dependencias** (`05-dip.ts`): `OrderService` deja de crear un `EmailSender` concreto y recibe un `Notifier` por constructor, lo que permite usar email o SMS indistintamente.

**Ejecutar:** `npm install` y luego `npm run 01-srp` … `npm run 05-dip`.

---

## 4. `refactorizacionServidorExpress-main` — Refactorización de una API

Una API de empleados que originalmente tenía toda la lógica dentro de `server.ts` (`server-old.ts`) y fue reorganizada en capas con responsabilidades bien definidas:

```text
src/
├── controllers/   → reciben peticiones, validan datos y responden
├── models/        → esquema de empleado en MongoDB
├── routes/        → definen los endpoints y conectan las capas
├── repository/    → consultas y operaciones sobre la base de datos
├── service/       → lógica de negocio (cálculo del salario final)
├── errorHandler/  → manejo centralizado de errores
└── server.ts      → configuración de Express, MongoDB y middlewares
```

La regla de negocio es: **salario final = salario base + 2 % del salario base por cada año de antigüedad**. La separación en capas se acompaña de **inyección de dependencias** (`Repository → Service → Controller → Routes`) e interfaces específicas, aplicando varios principios SOLID.

**Endpoints:** `POST /employees`, `GET /employees`, `GET /employees/:id`.

**Ejecutar:**
```bash
docker compose up -d   # levanta MongoDB
npm install
npm run dev
```

---

## 5. `tlp4-introduccion-testing-main` — Calidad y pruebas de software

Material teórico y un laboratorio práctico sobre pruebas automatizadas en una API de precios con Express.

La guía (`README.md`) explica por qué probar, la diferencia entre pruebas **unitarias**, de **integración** y **E2E**, la pirámide de pruebas, TDD, cobertura, dobles de prueba e integración continua.

En `demo_practica/` se implementa:

- `src/services/precios.ts`: función `calcularPrecioFinal`, con validaciones que lanzan `RangeError` ante precios o descuentos inválidos.
- `tests/precios.test.ts`: pruebas unitarias con **Vitest** (descuentos habituales, límite de 0 % y 100 %, valores inválidos, `NaN`).
- `tests/api.test.ts`: pruebas de integración con **Supertest**, incluyendo la respuesta HTTP 400 ante un descuento del 150 %.
- `.github/workflows/pruebas.yml`: flujo de **GitHub Actions** que instala dependencias, ejecuta el chequeo de tipos y corre las pruebas.

**Ejecutar:**
```bash
cd demo_practica
npm install
npm test             # Vitest
npm run typecheck    # tsc --noEmit
npm run dev          # servidor en http://localhost:3000
```

---

## Tecnologías utilizadas

- **Lenguaje:** TypeScript
- **Entorno:** Node.js
- **Backend:** Express 5, Mongoose
- **Base de datos:** MongoDB (vía Docker Compose)
- **Testing:** Vitest, Supertest
- **CI:** GitHub Actions
- **Herramientas:** Docker, Postman, Git

---

## Conclusión

Los trabajos siguen una progresión: primero se comprenden los **pilares de la POO**, luego se aplican **patrones de diseño** y **principios SOLID**, después se llevan esos conceptos a una **API real refactorizada por capas**, y finalmente se incorporan **pruebas automatizadas** para verificar que el comportamiento se mantiene. En conjunto, el repositorio documenta el proceso de pasar de código que simplemente "funciona" a código que además es claro, extensible y confiable.
