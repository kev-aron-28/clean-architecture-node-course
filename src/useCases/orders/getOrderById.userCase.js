module.exports = dependencies => {
    const { ordersRepository } = dependencies;

    if(!ordersRepository) {
        throw new Error('You must specify dependencies');
    }

    const execute = ({id}) => {        
        return ordersRepository.getById(id);
    }

    return {
        execute
    }
}