export class Rating
{
    constructor(
        public employee_id?:string,
        public rating?:string,
        public shift_id?:number,
        public shift_approved?:boolean,
        public shift_in_day?:number
    )
    {}
}