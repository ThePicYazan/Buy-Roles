const mongoose = require('mongoose');
const mongodb = process.env.mongodb

async function Database() {
    await mongoose.set('strictQuery', true);
    await mongoose.connect(mongodb).then(async () => {
        console.log(`[ The Database Has Been Registered ]`);
    }).catch(async () => {
        console.log(`I can't Access The Database`);
    })
} Database();