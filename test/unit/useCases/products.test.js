const { 
    product: { addProductUseCase, getByIdUseCase, updateProductUseCase, deleteProductUseCase }
} = require('../../../src/useCases')

const Chance = require('chance');
const { User,} = require('../../../src/entities');
const { v4: uuid } = require('uuid');
const chance = new Chance();
describe('Product useCases', () => {

    const mockUserRepo = {
        add: jest.fn(async user => ({
            ...user,
            id: uuid()
        })),
        getById: jest.fn(async id => ({
            id,
            name: chance.name(),
            description: chance.last(),
            images: chance.avatar(),
            price: chance.age(),
            meta: {  },
        color: chance.color(),
        })),
        update: jest.fn(async user => user),
        delete: jest.fn(async user => user)
    }

    const dependencies = {
        productsRepository: mockUserRepo
    }

    describe('Add user user case',  () => {
        test('User should be added', async () => {
            const testProduct = {
                name: chance.name(),
                description: chance.last(),
                images: chance.avatar(),
                price: chance.age(),
                meta: {  },
                color: chance.color(),
            } 
    
            const addedProduct = await addProductUseCase(dependencies).execute(testProduct)
            expect(addedProduct.id).toBeDefined();
            expect(addedProduct.name).toBe(testProduct.name);
            expect(addedProduct.description).toBe(testProduct.description);
            expect(addedProduct.images).toBe(testProduct.images);   
            expect(addedProduct.price).toBe(testProduct.price);
            expect(addedProduct.color).toBe(testProduct.color);

            const call = mockUserRepo.add.mock.calls[0][0];
            expect(call.id).toBeUndefined();
            expect(call.name).toBe(testProduct.name);
            expect(call.description).toBe(testProduct.description);
            expect(call.images).toBe(testProduct.images);   
            expect(call.price).toBe(testProduct.price);
            expect(call.color).toBe(testProduct.color);
            
        });
    });

    describe('Get user use case', () => {
        test('User should be returned by id', async () => {
            const fakeId = uuid();
            const userById = await getByIdUseCase(dependencies).execute({
                id: fakeId
            });
            expect(userById.id).toBeDefined();
            expect(userById.name).toBeDefined(); 
            expect(userById.description).toBeDefined();
            expect(userById.images).toBeDefined();   
            expect(userById.price).toBeDefined(); 
            expect(userById.color).toBeDefined(); 

            const call = mockUserRepo.add.mock.calls[0][0];
            expect(call.name).toBeDefined();
            expect(call.description).toBeDefined();
            expect(call.images).toBeDefined();   
            expect(call.price).toBeDefined(); 
            expect(call.color).toBeDefined(); 
        });
    });

    describe('Update product use case', () => {
        test('Product should be updated', async () => {
            const testProduct = {
                name: chance.name(),
                description: chance.last(),
                images: chance.avatar(),
                price: chance.age(),
                meta: {  },
                color: chance.color(),
            } 

            const updatedProduct = await updateProductUseCase(dependencies)
                .execute({ product: testProduct })

            expect(updatedProduct).toEqual(testProduct);

            const call = mockUserRepo.add.mock.calls[0][0];
            expect(call.id).toBeUndefined();
            expect(call.description).toBeDefined();
            expect(call.price).toBeDefined();
            expect(call.images).toBeDefined()
        });
    });

    describe('Delete product use case', () => {
        test('Product should be deleted', async () => {
            const testProduct = {
                name: chance.name(),
                description: chance.last(),
                images: chance.avatar(),
                price: chance.age(),
                meta: {  },
                color: chance.color(),
            } 

            const deletedProduct = await deleteProductUseCase(dependencies)
                .execute({ product: testProduct })

            expect(deletedProduct).toEqual(testProduct);

            const call = mockUserRepo.add.mock.calls[0][0];
            expect(call.id).toBeUndefined();
            expect(call.description).toBeDefined();
            expect(call.price).toBeDefined();
            expect(call.images).toBeDefined()
        });
    });
});