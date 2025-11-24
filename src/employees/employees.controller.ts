import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import type { Employees } from './employees.interface';

@Controller('employees')
export class EmployeesController {
    constructor(private employeesService: EmployeesService) { }

    @Get()
    index() {
        return this.employeesService.getAllEmployees()
    }

    @Get('/:id')
    show(@Param('id') id: string) {
        return this.employeesService.getOneEmployee(id)
    }

    @Post()
    store(@Body() employee: Employees) {
        return this.employeesService.createOneEmployee(employee)
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() department: Employees) {
        return this.employeesService.updateOneEmployee(id, department)
    }

    @Delete('/:id')
    destroy(@Param('id') id: string) {
        return this.employeesService.deleteOneDepartment(id)
    }
}
