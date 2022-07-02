const { User } = require('../../entities/index');

module.exports = dependencies => {
    const { usersRepository } = dependencies;
    console.log(usersRepository)
    if(!usersRepository) {
        throw new Error('You must specify dependencies');
    }

    const execute = ({ name, lastName, gender, meta}) => {
        const user = new User({ name, lastName, gender, meta });
        
        return usersRepository.add(user);
    }

    return {
        execute
    }
}