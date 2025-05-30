export default class ErrorResponse extends Error {
    
    constructor(
        statusCode, message= "something went wrong" , errors=[],stack=""
    ){
        super(message)
        this.statusCode = statusCode;
        this.message = message;
        this.data = {};
        this.success = false;
        this.errors = errors
        
        if(stack){
         this.stack = stack
        }
        else{
         Error.captureStackTrace(this,this.constructor);
        }
    }
}