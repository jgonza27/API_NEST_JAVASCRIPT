import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Employees } from './employees.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
    constructor(private prisma: PrismaService) { }

    async getAllEmployees() {
        return this.prisma.employee.findMany();
    }

    async getOneEmployee(DNI: string) {
        return this.prisma.employee.findUnique({
            where: { DNI },
        });
    }

    async createOneEmployee(employee: Employees) {
        const departmentFound = await this.prisma.department.findUnique({
            where: { id: employee.department_id },
        });

        if (!departmentFound) {
            return { 'respuesta': `Departamento con id ${employee.department_id} no encontrado` };
        }

        // Generamos hash de la contraseña
        const saltOrRounds = 10;
        const salt = await bcrypt.genSalt(saltOrRounds);
        const password = employee.password;
        const hash = await bcrypt.hash(password, salt);
        employee.password = hash;

        await this.prisma.employee.create({ data: employee });
        return { 'respuesta': 'Empleado creado con exito' };
    }

    async updateOneEmployee(DNI: string, employee: Employees) {
        return this.prisma.employee.update({
            where: { DNI },
            data: employee,
        });
    }

    async deleteOneEmployee(DNI: string) {
        return this.prisma.employee.delete({
            where: { DNI },
        });
    }

    async getOneEmployeeByLogin(login: string) {
        const found = await this.prisma.employee.findUnique({
            where: { login },
        });

        if (!found)
            return { 'respuesta': `Empleado con Login ${login} no encontrado` };

        return { 'respuesta': found };
    }
}
