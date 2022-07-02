const addProductController = require('./addProduct.controller');
const updateProductController = require('./updateProduct.controller');
const deleteProductController = require('./deleteProduct.controller');
const getProductByIdController = require('./getProductById.controller');

module.exports = dependencies => {
    return {
        addProductController: addProductController(dependencies),
        getProductByIdController: getProductByIdController(dependencies),
        updateProductController: updateProductController(dependencies),
        deleteProductController: deleteProductController(dependencies)
    }
}