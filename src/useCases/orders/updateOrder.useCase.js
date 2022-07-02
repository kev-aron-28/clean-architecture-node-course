module.exports = dependencies => {
    const { ordersRepository } = dependencies;

    if(!ordersRepository) {
        throw new Error('You must specify dependencies');
    }

    const execute = ({ order = {} }) => {        
        return ordersRepository.update(order);
    }

    return {
        execute
    }
}