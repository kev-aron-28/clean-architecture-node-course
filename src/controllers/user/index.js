const addUserController = require('./addUser.controller');
const updateUserController = require('./updateUser.controller');
const deleteUserController = require('./deleteUser.controller');
const getByUserByIdController = require('./geUserById.controller');

module.exports = dependencies => {
    return {
        addUserController: addUserController(dependencies),
        updateUserController: updateUserController(dependencies),
        deleteUserController: deleteUserController(dependencies),
        getByUserByIdController: getByUserByIdController(dependencies),
    }
}