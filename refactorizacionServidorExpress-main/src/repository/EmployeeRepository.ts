// El repositorio concentra el acceso a los datos y evita que las demás capas se comuniquen directamente con MongoDB.


import { Employee } from "../models/Employee.model.js";
import { EmployeeInterface } from "../models/Employee.model.js";

export class EmployeeRepository {

    // Registra un empleado nuevo.
    async createEmployee(employees: EmployeeInterface){
        const newEmployee = await Employee.create(employees)
        return newEmployee
    }

    // Recupera todos los empleados.
    async getEmployees(){
        const employees = await Employee.find()
        return employees
    }

    // Busca un empleado mediante su identificador.
    async getEmployeeById(id: string){
        const employee = await Employee.findById(id)
        return employee
    }
}