module.exports = dependencies => {
    const { productsRepository } = dependencies;

    if(!productsRepository) {
        throw new Error('You must specify dependencies');
    }

    const execute = ({ product = {} }) => {        
        return productsRepository.delete(product);
    }

    return {
        execute
    }
}