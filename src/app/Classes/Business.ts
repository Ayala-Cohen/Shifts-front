export class Business
{
    constructor(
        public id?:number,
        public name?:string,
        public logo?:Array<ByteLengthChunk>,//check what the change for byte[]
        public user_name?:string,
        public password?:string,
        public full_name?:string,
        public number?:number
    )
    {}
}