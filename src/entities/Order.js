class Order {
    constructor({ 
        id, 
        userId = null, 
        productsId = [], 
        date = new Date(), 
        isPayed = false, 
        meta = {} 
    } = {}) {
        this.id = id;
        this.userId = userId;
        this.productsId = productsId;
        this.date = date;
        this.isPayed = isPayed;
        this.meta = meta;
    }
}

module.exports = {
    Order
}