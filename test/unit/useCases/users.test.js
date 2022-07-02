const { 
    user: { addUserUseCase, getUserByIdUseCase, updateUserUseCase, deleteUserUseCase }, 
    user 
} = require('../../../src/useCases')

const Chance = require('chance');
const { User, constants: { userConstants }  } = require('../../../src/entities');
const { v4: uuid } = require('uuid');
const chance = new Chance();
describe('User useCases', () => {

    const mockUserRepo = {
        add: jest.fn(async user => ({
            ...user,
            id: uuid()
        })),
        getById: jest.fn(async id => ({
            id,
            name: chance.name(),
            lastName: chance.last(),
            gender: userConstants.MALE,
            meta: {}
        })),
        update: jest.fn(async user => user),
        delete: jest.fn(async user => user)
    }

    const dependencies = {
        usersRepository: mockUserRepo
    }

    describe('Add user user case',  () => {
        test('User should be added', async () => {
            const testUser = {
                name: chance.name(),
                lastName: chance.last(),
                gender: userConstants.MALE,
                meta: {
                    emai: chance.email()
                }
            } 
    
            const addedUser = await addUserUseCase(dependencies).execute(testUser)
            expect(addedUser.id).toBeDefined();
            expect(addedUser.name).toBe(testUser.name);
            expect(addedUser.gender).toBe(testUser.gender);
            expect(addedUser.meta).toEqual(testUser.meta);   
            
            const call = mockUserRepo.add.mock.calls[0][0];
            expect(call.id).toBeUndefined();
            expect(call.name).toBe(testUser.name);
            expect(call.gender).toBe(testUser.gender);
            expect(call.meta).toEqual(testUser.meta);   
            
        });
    });

    describe('Get user use case', () => {
        test('User should be returned by id', async () => {
            const fakeId = uuid();
            const userById = await getUserByIdUseCase(dependencies).execute({
                id: fakeId
            });
            expect(userById.id).toBeDefined();
            expect(userById.id).toBe(fakeId); 
            expect(userById.name).toBeDefined();
            expect(userById.gender).toBeDefined();   
            
            const call = mockUserRepo.add.mock.calls[0][0];
            expect(call.id).toBeUndefined();
            expect(call.name).toBeDefined();
            expect(call.gender).toBeDefined();
        });
    });

    describe('Update user use case', () => {
        test('User should be updated', async () => {
            const testData = {
                id: uuid(),
                name: chance.name(),
                lastName: chance.last(),
                gender: userConstants.FEMALE,
                meta: { 
                    education: {
                        school: 'full'
                    }
                }
            }

            const updatedUser = await updateUserUseCase(dependencies)
                .execute({ user: testData })

            expect(updatedUser).toEqual(testData);

            const call = mockUserRepo.add.mock.calls[0][0];
            expect(call.id).toBeUndefined();
            expect(call.name).toBeDefined();
            expect(call.gender).toBeDefined();
        });
    });

    describe('Delete user use case', () => {
        test('User should be deleted', async () => {
            const testData = {
                id: uuid(),
                name: chance.name(),
                lastName: chance.last(),
                gender: userConstants.FEMALE,
                meta: { 
                    education: {
                        school: 'full'
                    }
                }
            }

            const deletedUser = await deleteUserUseCase(dependencies)
                .execute({ user: testData })

            expect(deletedUser).toEqual(testData);

            const call = mockUserRepo.add.mock.calls[0][0];
            expect(call.id).toBeUndefined();
            expect(call.name).toBeDefined();
            expect(call.gender).toBeDefined();

        });
    });
});