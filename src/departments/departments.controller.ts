import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import type { Departments } from './departments.interface';

@Controller('departments')
export class DepartmentsController {
    constructor(private departmentService: DepartmentsService) { }

    @Get()
    index() {
        return this.departmentService.getAllDepartments()
    }

    @Get('/:id')
    show(@Param('id') id: string) {
        return this.departmentService.getOneDepartment(id)
    }

    @Post()
    store(@Body() department: Departments) {
        return this.departmentService.createOneDepartment(department)
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() department: Departments) {
        return this.departmentService.updateOneDepartment(id, department)
    }

    @Delete('/:id')
    destroy(@Param('id') id: string) {
        return this.departmentService.deleteOneDepartment(id)
    }
}
