import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EMPLOYEE_KEY } from 'src/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    // Get the required employee status from the metadata
    const requiredEmployeeStatus = this.reflector.getAllAndOverride<boolean>(EMPLOYEE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Get the user object from the request
    const { user } = context.switchToHttp().getRequest();

    // Check if the user object exists
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // If no specific requirement is set, allow access
    if (requiredEmployeeStatus === undefined) {
      return true;
    }

    // Allow access if user is logged in and the employee status matches
    if (requiredEmployeeStatus === false) {
      return true;
    }

    // Check if the user's employee status matches the requirement
    return user.employee === requiredEmployeeStatus;
  }
}
