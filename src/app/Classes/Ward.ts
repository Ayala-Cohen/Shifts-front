export class Ward {
    constructor(
        public id?:number,
        public name?: string,
        public business_id?:number,
        public diary_opening_day?:Date,
        public diary_closing_day?:Date,
        //check - it's not write in the c#
        public num_tasks?:number,
        public list_tasks?: Array<string>
    ) { }

}