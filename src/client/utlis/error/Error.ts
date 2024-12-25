class error extends Error {
    statusCode: number;
  constructor( message: string,  statusCode: number, stack?: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
     if(stack) {
      this.stack = stack;
     } else {
        Error.captureStackTrace(this, this.constructor);
    }
}
  
}
export default error;
