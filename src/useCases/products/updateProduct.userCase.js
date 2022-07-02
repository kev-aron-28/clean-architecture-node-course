module.exports = dependencies => {
    const { productsRepository } = dependencies;

    if(!productsRepository) {
        throw new Error('You must specify dependencies');
    }

    const execute = ({ product  = {} }) => {       
        console.log({ product }) 
        return productsRepository.update(product);
    }

    return {
        execute
    }
}