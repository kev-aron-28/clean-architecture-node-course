const Chance = require('chance');
const { cloneDeep } = require('lodash');
const chance = new Chance();
const { User, userConstants } = require('../../../src/entities/User');
const usersRepository = require('../../../src/frameworks/repositories/inMemory/usersRepository');

describe('Users respository', () => {
    test('New user should be added and returned', async () => {
        const testUser = new User({ 
            name: chance.name(), 
            lastName: chance.last(), 
            gender: userConstants.FEMALE,
            meta: { hair: { color: 'black' } } 
        });

        const addedUser = await usersRepository.add(testUser);
        expect(addedUser).toBeDefined();
        expect(addedUser.id).toBeDefined();
        expect(addedUser.name).toBe(testUser.name);
        expect(addedUser.gender).toBe(testUser.gender);
        expect(addedUser.meta).toEqual(testUser.meta);

        const returnedUser = await usersRepository.getById(addedUser.id);
        expect(returnedUser).toBeDefined();
    })

    test('New user should be deleted', async () => {
        const toBeDeletedUser = new User({ 
            name: chance.name(), 
            lastName: chance.last(), 
            gender: userConstants.FEMALE,
            meta: { hair: { color: 'black' } } 
        });

        const notToBeDeletedUser = new User({ 
            name: chance.name(), 
            lastName: chance.last(), 
            gender: userConstants.FEMALE,
            meta: { hair: { color: 'white' } } 
        });

        const [ shouldBeDeletedUser, shouldNotBeDeletedUser ] = await Promise.all([
            usersRepository.add(toBeDeletedUser),
            usersRepository.add(notToBeDeletedUser)
        ])

        expect(shouldBeDeletedUser).toBeDefined();
        expect(shouldNotBeDeletedUser).toBeDefined();

        const deletedUser = await usersRepository.delete(shouldBeDeletedUser);
        expect(deletedUser).toEqual(shouldBeDeletedUser);


        const deletedUserByIdNotDefined = await usersRepository.getById(shouldBeDeletedUser.id);
        expect(deletedUserByIdNotDefined).toBeUndefined();

    
    })

    test('New user should be updated', async () => {
        const testUser = new User({ 
            name: chance.name(), 
            lastName: chance.last(), 
            gender: userConstants.FEMALE,
            meta: { hair: { color: 'black' } } 
        });

        const addedUser = await usersRepository.add(testUser);

        expect(addedUser).toBeDefined();

        const cloneUser = cloneDeep({ ...addedUser, name: chance.name(), gender: userConstants.MALE })

        const updatedUser = await usersRepository.update(cloneUser);
        expect(updatedUser).toEqual(cloneUser);

    })
});