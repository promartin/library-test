import { SetMetadata } from '@nestjs/common';

export const EMPLOYEE_KEY = 'employee';
export const Employee = (employee: boolean) => SetMetadata(EMPLOYEE_KEY, employee);
