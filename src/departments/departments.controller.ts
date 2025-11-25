import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Departments } from './departments';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('departments')
export class DepartmentsController {
    constructor(private departmentService: DepartmentsService) { }

    @Get()
    index() {
        return this.departmentService.getAllDepartments();
    }

    @Get('/:id')
    show(@Param('id') id: string) {
        return this.departmentService.getOneDepartment(id);
    }

    @Post()
    @ApiBody({ type: Departments })
    store(@Body() departmentDTO: Departments) {
        return this.departmentService.createOneDepartment(departmentDTO);
    }

    @Put('/:id')
    @ApiBody({ type: Departments })
    update(
        @Param('id') id: string,
        @Body() departmentDTO: Departments,
    ) {
        return this.departmentService.updateOneDepartment(id, departmentDTO);
    }

    @Delete('/:id')
    destroy(@Param('id') id: string) {
        return this.departmentService.deleteOneDepartment(id);
    }
}
