// El servicio implementa la lógica de negocio, procesa los datos y coordina las operaciones del controlador y el repositorio.


import { EmployeeRepository } from "../repository/EmployeeRepository.js";
import { EmployeeInterface } from "../models/Employee.model.js";

export class EmployeeService {

    // Recibe el repositorio para acceder a los datos sin consultar MongoDB directamente desde el servicio.
    repository: EmployeeRepository;

    constructor(repository: EmployeeRepository){
        this.repository = repository
    }

    

    // Calcula el salario final del empleado.
    finalSalary(baseSalary: number, yearsOfService: number){

        const additional = baseSalary * 0.02 * yearsOfService
        const salarioFinal = baseSalary + additional

        return salarioFinal
    }

    async createEmployee(employee: EmployeeInterface){

        // El salario final no lo ingresa el usuario: se calcula aquí y se agrega al objeto del empleado.
        const finalSalary = this.finalSalary(
        employee.baseSalary,
        employee.yearsOfService
    );

    // Se combina la información del empleado con el salario calculado antes de enviarla al repositorio.

        const employeeWithSalary = {
        ...employee,
        finalSalary
    };

        return await this.repository.createEmployee(employeeWithSalary)
    }


    async getEmployees(){
        return await this.repository.getEmployees()
    }


    async getEmployeeById(id: string){
        return await this.repository.getEmployeeById(id)
    }
}