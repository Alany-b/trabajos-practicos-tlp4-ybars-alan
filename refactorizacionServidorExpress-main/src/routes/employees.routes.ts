    import { Request, Response, NextFunction, Router } from "express";
    import { EmployeeControllers } from "../controllers/employee.controller.js";
    import { EmployeeRepository } from "../repository/EmployeeRepository.js";
    import { EmployeeService } from "../service/EmployeeService.js";

export class EmployeeRoutes {

    // Al ser estático, se puede acceder a esta ruta sin instanciar EmployeeRoutes.
    // El getter permite consultarla como una propiedad: EmployeeRoutes.routes.


    static get routes(): Router{

        // Se vinculan las capas mediante dependencias: el repositorio accede a MongoDB,
        // el servicio aplica la lógica de negocio y el controlador procesa las solicitudes.
        const router = Router()

        const repository = new EmployeeRepository();
        const service = new EmployeeService(repository);
        const controller = new EmployeeControllers(service);


        // Ruta para crear un empleado.
        router.post('/', (req: Request, res: Response, next: NextFunction) => controller.createEmployee(req, res, next))

        // Ruta para obtener todos los empleados.
        router.get('/', (req: Request, res: Response, next: NextFunction) => controller.getEmployees(res, next));

        // Ruta para buscar un empleado por su identificador.
        router.get('/:id', (req: Request, res: Response, next: NextFunction) => controller.getEmployeeById(req, res, next))

        


        
        return router  
    }

    }