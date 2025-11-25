import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from 'src/employees/employees.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private employeesService: EmployeesService,
        private jwtService: JwtService,
    ) { }

    async signIn(login: string, pass: string): Promise<any> {
        const comprobacion = await this.employeesService.getOneEmployeeByLogin(login);

        if (comprobacion.respuesta === `Empleado con Login ${login} no encontrado`)
            return comprobacion;

        const employee: any = comprobacion.respuesta;

        // Verificación del hash de la contraseña
        if (!bcrypt.compare(employee.password, pass)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: employee.DNI, login: employee.login };
        const JWT = await this.jwtService.signAsync(payload);

        return { 'respuesta': JWT };
    }
}
