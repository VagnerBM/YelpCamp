if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const mongoose = require('mongoose');
mongoose.set("strictQuery", true)
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/yelp-camp';

mongoose.connect(dbUrl)
    .then(() => {
        console.log('Database connected')
    })
    .catch(err => {
        console.log(err)
        console.log('connection error')
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '63d8f4fba2c596cabc0b99d8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit nulla ipsum eveniet consequuntur! Odio id quibusdam deserunt earum nesciunt praesentium, qui fuga suscipit voluptate voluptatibus asperiores neque. Facilis, ipsam dignissimos?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvty6r2wv/image/upload/v1676546759/YelpCamp/qrjrd5mow7yo5ish4d8n.jpg',
                    filename: 'YelpCamp/qrjrd5mow7yo5ish4d8n',
                },
                {
                    url: 'https://res.cloudinary.com/dvty6r2wv/image/upload/v1676546760/YelpCamp/o2mojvv11t3y3ddbj2df.jpg',
                    filename: 'YelpCamp/o2mojvv11t3y3ddbj2df.jpg',
                }
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
})