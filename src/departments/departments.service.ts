import { Injectable } from '@nestjs/common';
import { Departments } from './departments.interface';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class DepartmentsService {
    // Atributos
    private departaments: any = [];

    // Métodos
    constructor(private prisma: PrismaService) { }
    getAllDepartments() {
        return { 'respuesta': this.departaments };
    }

    getOneDepartment(id: string) {
        const departmentFound = this.departaments.find(
            (departments) => departments.id === id,
        );

        if (!departmentFound) {
            return { 'respuesta': `Departamento con id ${id} no encontrado` };
        }

        return { 'respuesta': departmentFound };
    }

    async createOneDepartment(department: Departments) {
        await this.prisma.department.create({ data: department });
        return { 'respuesta': 'Departamento creado con exito' };
    }


    updateOneDepartment(id: string, department: Departments) {
        const departmentFound = this.departaments.find(
            (departaments) => departaments.id === id,
        );

        if (!departmentFound) {
            return { respuesta: `Departamento con id ${id} no encontrado` };
        }

        let posicion: number = parseInt(
            this.departaments.findIndex(
                (departaments) => departaments.id === id,
            ) as any,
        );

        this.departaments.splice(posicion, 1, department);
        return { respuesta: 'Departamento actualizado con exito' };
    }

    deleteOneDepartment(id: string) {
        const departmentFound = this.departaments.find(
            (departaments) => departaments.id === id,
        );

        if (!departmentFound) {
            return { respuesta: `Departamento con id ${id} no encontrado` };
        }

        let posicion: number = parseInt(
            this.departaments.findIndex(
                (departaments) => departaments.id === id,
            ) as any,
        );

        this.departaments.splice(posicion, 1);
        return { respuesta: 'Departamento borrado con exito' };
    }
}
