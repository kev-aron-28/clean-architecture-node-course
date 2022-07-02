const express = require('express');

const {
    usersController
 } = require('../../../controllers');


module.exports = dependencies => {
    const router = express.Router();
    const {
        addUserController,
        getByUserByIdController,
        updateUserController,
        deleteUserController
     } = usersController(dependencies);

    router.route('/').post(addUserController).delete(deleteUserController).put(updateUserController);
    router.route('/:id').get(getByUserByIdController);
    
    return router;
}