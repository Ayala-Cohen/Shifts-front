export class Rating
{
    constructor(
        public employee_id?:string,
        public rating_start_date?:Date,
        public rating_end_date?:Date,
        public rating?:string,
        public day?:string,
        public shift_id?:number,
        public shift_approved?:boolean
    )
    {}
}