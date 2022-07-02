const mongoose = require('mongoose');

const ENTITY_NAME = 'User';

const { schemas: {
        user: userSchema
    } 
} = require('../../database/mongo');

const repository = () => {

    const User = mongoose.model(ENTITY_NAME, userSchema);


    return {
        add: async user => {
            const newUser = new User(user);
            return newUser.save();
        },
        update: async user => {
           const { id } = user;
           delete user.id;
           return User.findByIdAndUpdate(id, { 
                ...user,
                updatedAt: new Date()
           }, { new: true }).lean();
        },
        delete: async user => {
            const { id } = user;
            delete user.id;
            return User.findByIdAndUpdate(id, { 
                deletedAt: new Date()
            }, { new: true }).lean();
        },
        getById: async userId => {
            return User.findOne({
                _id: userId,
                deletedAt: {
                    $exists: false
                }
            })
        }
    }
}

module.exports = repository();