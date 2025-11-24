import { Module } from '@nestjs/common';
import { DepartmentsModule } from './departments/departments.module';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DepartmentsModule, EmployeesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
