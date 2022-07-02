const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

module.exports = new Schema({
    userId: ObjectId,
    productsId: Array(ObjectId),
    date: Date,
    meta: Object,
    deletedAt: Date,
    isPayed: Boolean,
    updatedAt: Date
})