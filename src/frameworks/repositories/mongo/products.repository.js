const mongoose = require('mongoose');

const ENTITY_NAME = 'Product';

const { schemas: {
        product: productSchema
    } 
} = require('../../database/mongo');

const repository = () => {

    const Product = mongoose.model(ENTITY_NAME, productSchema);


    return {
        add: async product => {
            const newProduct = new Product(product);
            return newProduct.save();
        },
        update: async product => {
           const { id } = product;
           delete product.id;
           return Product.findByIdAndUpdate(id, { 
                ...product,
                updatedAt: new Date()
           }, { new: true }).lean();
        },
        delete: async product => {
            const { id } = product;
            delete product.id;
            return Product.findByIdAndUpdate(id, { 
                deletedAt: new Date()
            }, { new: true }).lean();
        },
        getById: async productId => {
            return Product.findOne({
                _id: productId,
                deletedAt: {
                    $exists: false
                }
            })
        }
    }
}

module.exports = repository();