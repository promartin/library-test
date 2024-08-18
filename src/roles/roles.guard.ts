import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EMPLOYEE_KEY } from 'src/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    // Get the required employee status from the metadata
    const isEmployeeRequired = this.reflector.getAllAndOverride<boolean>(EMPLOYEE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no specific requirement is set, allow access
    if (isEmployeeRequired === undefined) {
      return true;
    }

    // Get the user object from the request
    const { user } = context.switchToHttp().getRequest();

    // Check if the user's employee status matches the requirement
    return user && user.employee === isEmployeeRequired;
  }
}
