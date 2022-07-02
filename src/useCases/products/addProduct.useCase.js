module.exports = dependencies => {
    const { productsRepository } = dependencies;

    if(!productsRepository) {
        throw new Error('You must specify dependencies');
    }

    const execute = ({
        name ,
        description,
        images,
        price,
        meta,
        color
    }) => {        
        return productsRepository.add({
            name ,
            description,
            images,
            price,
            meta,
            color
        });
    }

    return {
        execute
    }
}