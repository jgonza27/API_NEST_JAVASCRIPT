import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmployeesModule } from 'src/employees/employees.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { EmployeesService } from 'src/employees/employees.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    EmployeesModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, EmployeesService, PrismaService]
})
export class AuthModule { }
