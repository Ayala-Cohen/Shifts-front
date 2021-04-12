import { Employee } from './Employee';
import { EmployeesRole } from './EmployeesRole';
import { Ward } from './Ward';

export class EmployeeWithWholeData {
    constructor(
        public employee?:Employee,
        public role?:EmployeesRole,
        public list_departments?:Array<Ward>
    ){}
}