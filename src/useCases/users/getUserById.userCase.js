module.exports = dependencies => {
    const { usersRepository } = dependencies;

    if(!usersRepository) {
        throw new Error('You must specify dependencies');
    }

    const execute = ({id}) => {        
        return usersRepository.getById(id);
    }

    return {
        execute
    }
}