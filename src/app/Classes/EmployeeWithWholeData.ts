import { Employee } from './Employee';
import { EmployeesRole } from './EmployeesRole';
import { Rating } from './Rating';
import { Ward } from './Ward';

export class EmployeeWithWholeData {
    constructor(
        public employee?:Employee,
        public list_departments?:Array<Ward>
    ){}
}