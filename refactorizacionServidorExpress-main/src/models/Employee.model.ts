import { model, Schema } from "mongoose";

// La interfaz Employee describe la estructura de los datos; el esquema define su validación y almacenamiento en MongoDB.
export interface EmployeeInterface {
    name: string;
    position: string;
    baseSalary: number;
    yearsOfService: number;
}

const employeeSchema = new Schema({

    name: { 
        type: String, 
        required: true 
    },
    position: {
        type: String, 
        required: true 
    },
    baseSalary: { 
        type: Number, 
        required: true 
    },
    yearsOfService: { 
        type: Number, 
        required: true 
    },
    finalSalary: { 
        type: Number, 
        required: true 
    }
}, { 
    timestamps: true 
}
);

export const Employee = model('Employee', employeeSchema);