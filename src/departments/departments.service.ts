import { Injectable } from '@nestjs/common';
import { Departments } from './departments';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DepartmentsService {
    // Atributos
    private departaments: any = []

    // Métodos
    constructor(private prisma: PrismaService) { }

    async getAllDepartments() {
        const departaments = await this.prisma.department.findMany()
        return { 'respuesta': departaments }
    }

    async getOneDepartment(id: string) {
        const departmentID = parseInt(id)
        const departmentFound = await this.prisma.department.findUnique({
            where: { id: departmentID }
        })
        if (!departmentFound) {
            return { 'respuesta': `Departamento con id ${id} no encontrado` }
        }
        return { 'respuesta': departmentFound }
    }

    async createOneDepartment(department: Departments) {
        await this.prisma.department.create(
            { data: department }
        );

        return { 'respuesta': 'Departamento creado con exito' };
    }


    async updateOneDepartment(id: string, department: Departments) {
        try {
            const departmentID = parseInt(id);
            await this.prisma.department.update({
                where: { id: departmentID },
                data: department
            });
            return { 'respuesta': 'Departamento actualizado con exito' };
        }
        catch (error) {
            return { 'respuesta': `Departamento con id ${id} no encontrado` };
        }
    }


    async deleteOneDepartment(id: string) {
        try {
            const departmentID = parseInt(id)
            await this.prisma.department.delete({
                where: { id: departmentID }
            })
            return { 'respuesta': 'Departamento borrado con exito' }
        } catch (error) {
            return { 'respuesta': `Departamento con id ${id} no encontrado` }
        }
    }
}
