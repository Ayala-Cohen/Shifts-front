export class ShiftEmployees
{
    constructor(
        public business_id?:number,
        public department_id?:number,
        public role_id?:number,
        public shift_id?:number,
        public number_of_shift_employees?:number,
        public day?:string
    ){}
}