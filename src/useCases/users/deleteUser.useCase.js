module.exports = dependencies => {
    const { usersRepository } = dependencies;

    if(!usersRepository) {
        throw new Error('You must specify dependencies');
    }

    const execute = ({ user = {} }) => {        
        return usersRepository.delete(user);
    }

    return {
        execute
    }
}