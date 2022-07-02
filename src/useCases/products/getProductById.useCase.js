module.exports = dependencies => {
    const { productsRepository } = dependencies;

    if(!productsRepository) {
        throw new Error('You must specify dependencies');
    }

    const execute = ({id}) => {        
        return productsRepository.getById(id);
    }

    return {
        execute
    }
}