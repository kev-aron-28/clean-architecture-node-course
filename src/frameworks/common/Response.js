class Response {
    constructor({ status = false, error = null, content = null}) {
        this.status = status;
        this.error = error;
        this.content = content;
    }

}

class ResponseError {
    constructor({ status, msg, reason, url, ip, validationErrors = [] }) {
        this.status = status;
        this.msg = msg;
        this.reason = reason;
        this.url = url;
        this.ip = ip;
        this.validationErrors = validationErrors;
    }
    
}

class ValidationError {
    constructor({ field, msg }) {
        this.field = field;
        this.msg = msg;
    }
    
}

module.exports = {
    Response,
    ResponseError,
    ValidationError
}