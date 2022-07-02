const addOrderUseCase = require('./addOrder.userCase');
const getOrderByIdUseCase = require('./getOrderById.userCase');
const updateOrderUseCase = require('./updateOrder.useCase');
const deleteOrderUseCase = require('./deleteOrder.useCase')
module.exports = {
    addOrderUseCase,
    getOrderByIdUseCase,
    updateOrderUseCase,
    deleteOrderUseCase
}
