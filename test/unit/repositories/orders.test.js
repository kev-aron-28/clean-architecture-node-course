const Chance = require('chance');
const { cloneDeep } = require('lodash');
const chance = new Chance();
const { Order } = require('../../../src/entities/Order');
const ordersRepository = require('../../../src/frameworks/repositories/inMemory/ordersRepositories');

describe('Orders respository', () => {
    test('New order should be added and returned', async () => {
        const testOrder = new Order({ 
            userId: chance.altitude(), 
            productsId: ['image1', 'image2', 'image3'],
            date: chance.date(),
            isPayed: true,
            meta: {}
        });

        const addedOrder = await ordersRepository.add(testOrder);
        expect(addedOrder).toBeDefined();
        expect(addedOrder.id).toBeDefined();
        expect(addedOrder.userId).toBe(testOrder.userId);
        expect(addedOrder.productsId).toBe(testOrder.productsId);
        expect(addedOrder.date).toEqual(testOrder.date);

        const returnedOrder = await ordersRepository.getById(addedOrder.id);
        expect(returnedOrder).toBeDefined();
    })

    test('New order should be deleted', async () => {
        const toBeDeletedOrder = new Order({ 
            userId: chance.altitude(), 
            productsId: ['image1', 'image2', 'image3'],
            date: chance.date(),
            isPayed: true,
            meta: {}
        });

        const notToBeDeletedOrder = new Order({ 
            userId: chance.altitude(), 
            productsId: ['image1', 'image2', 'image3'],
            date: chance.date(),
            isPayed: true,
            meta: {}
        });

        const [ shouldBeDeletedOrder, shouldNotBeDeletedOrder ] = await Promise.all([
            ordersRepository.add(toBeDeletedOrder),
            ordersRepository.add(notToBeDeletedOrder)
        ])

        expect(shouldBeDeletedOrder).toBeDefined();
        expect(shouldNotBeDeletedOrder).toBeDefined();

        const deletedOrder = await ordersRepository.delete(shouldBeDeletedOrder);
        expect(deletedOrder).toEqual(shouldBeDeletedOrder);


        const deletedProductByIdNotDefined = await ordersRepository.getById(shouldBeDeletedOrder.id);
        expect(deletedProductByIdNotDefined).toBeUndefined();
    })

    test('New order should be updated', async () => {
        const testOrder = new Order({ 
            userId: chance.altitude(), 
            productsId: ['image1', 'image2', 'image3'],
            date: chance.date(),
            isPayed: true,
            meta: {}
        });

        const addedOrder = await ordersRepository.add(testOrder);

        expect(addedOrder).toBeDefined();

        const cloneOrder = cloneDeep({ ...addedOrder, userId: chance.name(), date: chance.date() })

        const updatedOrder = await ordersRepository.update(cloneOrder);
        expect(updatedOrder).toEqual(cloneOrder);

    })
});