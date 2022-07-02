const { 
    order: { addOrderUseCase, getOrderByIdUseCase, deleteOrderUseCase, updateOrderUseCase },
    user: { getUserByIdUseCase, addUserUseCase },
    product: { getByIdUseCase, addProductUseCase},
} = require('../../../src/useCases')

const Chance = require('chance');
const { Order } = require('../../../src/entities');
const { v4: uuid } = require('uuid');
const chance = new Chance();
const { usersRepository, productsRepository } = require('../../../src/frameworks/repositories/inMemory/index');

describe('Order useCases', () => {

    const mockUserRepo = {
        add: jest.fn(async user => ({
            ...user,
            id: uuid()
        })),
        getById: jest.fn(async id => ({
            id,
            userId: chance.name(),
            productsId: chance.last(),
            date: chance.avatar(),
            isPayed: chance.bool(),
            meta: chance.color(),
        })),
        update: jest.fn(async user => user),
        delete: jest.fn(async user => user)
    }

    const dependencies = {
        ordersRepository: mockUserRepo,
        usersRepository,
        productsRepository,
        useCases: {
            user: { 
                getUserByIdUseCase: jest.fn(dependencies => getUserByIdUseCase(dependencies))
            },
            product: {
                getByIdUseCase: jest.fn(dependencies => getByIdUseCase(dependencies))
            }
        }
    }
    const mocks = {};
    let testOrderToAdd;

    beforeAll(async () => {
        const addProduct = addProductUseCase(dependencies).execute;
        const addUser = addUserUseCase(dependencies).execute;
        mocks.products = await Promise.all([1, 2, 3].map(() => addProduct({
            name: chance.name(),
            description: chance.sentence(),
            images: [chance.url(), chance.url(), chance.url()],
            price: chance.natural(),
            color: chance.color(),
            meta: {
                review: chance.sentence(),
            }
        })));

        mocks.users = await Promise.all([1,2,3].map(() => addUser({
            name: chance.name(),
            lastName: chance.last(),
            gender: 'MALE',
            meta: {
                hair: {
                    color: chance.color()
                }
            }
        })))

        testOrderToAdd = {
            userId: mocks.users[0].id,
            productsId: mocks.products.map(p => p.id),
            date: chance.avatar(),
            isPayed: chance.bool(),
            meta: chance.color(),
        }
        console.log(testOrderToAdd, mocks.products.map(p => p.id));
    })

    describe('Add product user case',  () => {
        test('Product should be added', async () => {
    
            const addedOrder = await addOrderUseCase(dependencies).execute(testOrderToAdd)
            expect(addedOrder.id).toBeDefined();
            expect(addedOrder.productsId).toBe(testOrderToAdd.productsId);
            expect(addedOrder.date).toBe(testOrderToAdd.date);
            expect(addedOrder.isPayed).toBe(testOrderToAdd.isPayed);   

            // const call = mockUserRepo.add.mock.calls[0][0];
            // expect(call.id).toBeUndefined();
            // expect(call.productsId).toBe(testOrder.productsId);
            // expect(call.date).toBe(testOrder.date);
            // expect(call.isPayed).toBe(testOrder.isPayed);   
            
        });
    });

    describe('Get product use case', () => {
        test('Product should be returned by id', async () => {
            const fakeId = uuid();
            const productById = await getOrderByIdUseCase(dependencies).execute({
                id: fakeId
            });
            expect(productById.id).toBeDefined();
            expect(productById.productsId).toBeDefined(); 
            expect(productById.date).toBeDefined();
            expect(productById.isPayed).toBeDefined(); 
            expect(productById.userId).toBeDefined(); 

            const call = mockUserRepo.add.mock.calls[0][0];
            expect(call.id).toBeUndefined();
            expect(call.productsId).toBeDefined();
            expect(call.date).toBeDefined();
            expect(call.isPayed).toBeDefined();   
            expect(productById.userId).toBeDefined();
        });
    });

    describe('Update product use case', () => {
        test('Product should be updated', async () => {
            const testOrder = {
                userId: chance.name(),
                productsId: chance.last(),
                date: chance.avatar(),
                isPayed: chance.bool(),
                meta: chance.color(),
            }

            const updatedOrder = await updateOrderUseCase(dependencies)
                .execute({ order: testOrder })

            expect(updatedOrder).toEqual(testOrder);

            const call = mockUserRepo.add.mock.calls[0][0];
            expect(call.id).toBeUndefined();
            expect(call.productsId).toBeDefined();
            expect(call.date).toBeDefined();
            expect(call.isPayed).toBeDefined();   
            expect(call.userId).toBeDefined();
        });
    });

    describe('Delete order use case', () => {
        test('Order should be deleted', async () => {
            const testOrder = {
                userId: chance.name(),
                productsId: chance.last(),
                date: chance.avatar(),
                isPayed: chance.bool(),
                meta: chance.color(),
            } 

            const deletedOrder = await deleteOrderUseCase(dependencies)
                .execute({ order: testOrder })

            expect(deletedOrder).toEqual(testOrder);

            const call = mockUserRepo.add.mock.calls[0][0];
            expect(call.id).toBeUndefined();
            expect(call.productsId).toBeDefined();
            expect(call.date).toBeDefined();
            expect(call.isPayed).toBeDefined();   
            expect(call.userId).toBeDefined();
        });
    });
});