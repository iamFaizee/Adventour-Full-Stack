const express = require('express');
const packageRoute = express.Router();

const { Packagemodel } = require('../models/Package.model');


packageRoute.get('/', async (req, res) => {
    try {
        const packages = await Packagemodel.find();
        res.json(packages);

    } catch (error) {

        console.log(error);
        res.json({ error: 'Package data not found' })
    }
});


packageRoute.get('/:region', async (req, res) => {
    try {
        const region = req.params.region
        const regionParam = await Packagemodel.find({ region })

        res.json(regionParam)
    } catch (error) {
        console.log(error)
        res.json({ error: 'Invalid region' })
    }
})



packageRoute.get('/details/:_id', async (req, res) => {
    try {
        const {_id} = req.params;
        // console.log(_id);
        const package = await Packagemodel.findOne({_id : _id});

        if (!package) {
            return res.json({ error: 'Package not found' });
        }

        res.json(package);
    } catch (error) {
        console.log(error);
        res.json({ error: 'Invalid ID' });
    }
});


module.exports = { packageRoute };
