const mongoose = require('mongoose');

const ENTITY_NAME = 'Order';

const { schemas: {
        order: orderSchema
    } 
} = require('../../database/mongo');

const repository = () => {

    const Order = mongoose.model(ENTITY_NAME, orderSchema);


    return {
        add: async order => {
            const newOrder = new Order(order);
            return newOrder.save();
        },
        update: async order => {
           const { id } = order;
           delete order.id;
           return Order.findByIdAndUpdate(id, { 
                ...order,
                updatedAt: new Date()
           }, { new: true }).lean();
        },
        delete: async order => {
            const { id } = order;
            delete order.id;
            return Order.findByIdAndUpdate(id, { 
                deletedAt: new Date()
            }, { new: true }).lean();
        },
        getById: async orderId => {
            return Order.findOne({
                _id: orderId,
                deletedAt: {
                    $exists: false
                }
            })
        }
    }
}

module.exports = repository();