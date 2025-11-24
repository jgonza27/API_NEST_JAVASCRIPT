import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Employees } from './employees.interface';

@Injectable()
export class EmployeesService {
    constructor(private prisma: PrismaService) { }

    async getAllEmployees() {
        const employees = await this.prisma.employee.findMany();
        return { 'respuesta': employees }
    }

    async getOneEmployee(DNI: string) {
        const employeeFound = await this.prisma.employee.findUnique({
            where: { DNI: DNI }
        })
        if (!employeeFound) {
            return { 'respuesta': `Empleado con DNI ${DNI} no encontrado` }
        }
        return { 'respuesta': employeeFound }
    }

    async createOneEmployee(employee: Employees) {
        const departmentFound = await this.prisma.department.findUnique({
            where: { id: employee.department_id }
        })
        if (!departmentFound)
            return { 'respuesta': `Departamento con id ${employee.department_id} no encontrado` }
        await this.prisma.employee.create({ data: employee });
        return { 'respuesta': 'Empleado creado con exito' }
    }

    async updateOneEmployee(DNI: string, employee: Employees) {
        try {
            await this.prisma.employee.update({
                where: { DNI: DNI }, data: employee
            })
            return { 'respuesta': 'Empleado actualizado con exito' }
        } catch (error) {
            return { 'respuesta': `Empleado con DNI ${DNI} no encontrado` }
        }
    }

    async deleteOneDepartment(DNI: string) {
        try {
            await this.prisma.employee.delete({
                where: { DNI: DNI }
            })
            return { 'respuesta': 'Empleado borrado con exito' }
        } catch (error) {
            return { 'respuesta': `Empleado con DNI ${DNI} no encontrado` }
        }
    }

    async getOneEmployeeByLogin(login: string) {
        const employeeFound = await this.prisma.employee.findUnique({
            where: { login: login }
        })
        if (!employeeFound)
            return { 'respuesta': `Empleado con Login ${login} no encontrado` }
        return { 'respuesta': employeeFound }
    }
}
