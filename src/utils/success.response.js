export default class SuccessResponse{

    constructor(
        statusCode,
        message="Success",
        data
    ){
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
        this.success = true;
    }
}