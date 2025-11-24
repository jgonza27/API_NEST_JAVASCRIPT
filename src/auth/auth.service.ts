import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class AuthService {
    constructor(
        private employeesService: EmployeesService,
        private jwtService: JwtService
    ) { }

    async signIn(login: string, pass: string): Promise<any> {
        const comprobacion = await this.employeesService.getOneEmployeeByLogin(login);

        if (comprobacion.respuesta === `Empleado con Login ${login} no encontrado`)
            return comprobacion

        const employee: any = comprobacion.respuesta

        if (employee.password !== pass)
            throw new UnauthorizedException();

        // const { password, ...result } = employee;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        const payload = { sub: employee.DNI, login: employee.login }
        const JWT = await this.jwtService.signAsync(payload)
        return { 'respuesta': JWT }
    }
}
