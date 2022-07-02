const Chance = require('chance');
const { cloneDeep } = require('lodash');
const chance = new Chance();
const { Product } = require('../../../src/entities/Product');
const productsRepository = require('../../../src/frameworks/repositories/inMemory/productsRepository');

describe('Products respository', () => {
    test('New product should be added and returned', async () => {
        const testProduct = new Product({ 
            name: chance.name(), 
            description: chance.last(), 
            images: ['image1', 'image2', 'image3'],
            meta: { hair: { color: 'black' } },
            color: 'black',
            price: 1200
        });

        const addedProduct = await productsRepository.add(testProduct);
        expect(addedProduct).toBeDefined();
        expect(addedProduct.id).toBeDefined();
        expect(addedProduct.description).toBe(testProduct.description);
        expect(addedProduct.images).toBe(testProduct.images);
        expect(addedProduct.color).toEqual(testProduct.color);

        const returnedProduct = await productsRepository.getById(addedProduct.id);
        expect(returnedProduct).toBeDefined();
    })

    test('New product should be deleted', async () => {
        const toBeDeletedProduct = new Product({ 
            name: chance.name(), 
            description: chance.last(), 
            images: ['image1', 'image2', 'image3'],
            meta: { hair: { color: 'black' } },
            color: 'black',
            price: 1200
        });

        const notToBeDeletedProduct = new Product({ 
            name: chance.name(), 
            description: chance.last(), 
            images: ['image4', 'image5', 'image6'],
            meta: { hair: { color: 'black' } },
            color: 'black',
            price: 1200
        });

        const [ shouldBeDeletedProduct, shouldNotBeDeletedProduct ] = await Promise.all([
            productsRepository.add(toBeDeletedProduct),
            productsRepository.add(notToBeDeletedProduct)
        ])

        expect(shouldBeDeletedProduct).toBeDefined();
        expect(shouldNotBeDeletedProduct).toBeDefined();

        const deletedProduct = await productsRepository.delete(shouldBeDeletedProduct);
        expect(deletedProduct).toEqual(shouldBeDeletedProduct);


        const deletedProductByIdNotDefined = await productsRepository.getById(shouldBeDeletedProduct.id);
        expect(deletedProductByIdNotDefined).toBeUndefined();

    
    })

    test('New user should be updated', async () => {
        const testProduct = new Product({ 
            name: chance.name(), 
            description: chance.last(), 
            images: ['image1', 'image2', 'image3'],
            meta: { hair: { color: 'black' } },
            color: 'black',
            price: 1200
        });

        const addedProduct = await productsRepository.add(testProduct);

        expect(addedProduct).toBeDefined();

        const cloneProduct = cloneDeep({ ...addedProduct, name: chance.name(), description: chance.address })

        const updatedProduct = await productsRepository.update(cloneProduct);
        expect(updatedProduct).toEqual(cloneProduct);

    })
});