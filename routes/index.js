const mongoose = require('mongoose');
const Task = mongoose.model('tasks');

const API_URL = '/api/task';
const ID_PREFIX = '/:id'
const BAD_REQUEST = 400;
const OK = 200;
const CREATED = 201;
const ACCEPTED = 202;

module.exports = (app) => {
 
    app.get(API_URL, async (req, res) => {

        var mFilter = {};
        if (typeof req.query.filter !== 'undefined' && req.query.filter !== 'all') {
            mFilter = {"status": req.query.filter};
        }

        let tasks = await Task.find(mFilter);
        return res.status(OK).send(tasks);
    });

    app.post(API_URL, async (req, res) => {
        try {
            let task = await Task.create(req.body);
            return res.status(CREATED).send({
                error: false,
                task
            });
        } catch (e) {
            return res.status(BAD_REQUEST).send({
                error: true,
                message: e.message
            });
        }
    });

    app.put(API_URL + ID_PREFIX, async (req, res) => {

        const { id } = req.params;

        var data = req.body;
        data.updated = Date.now();

        try {
            _ = await Task.findByIdAndUpdate(id, data);
            const task = await Task.findById(id)
            return res.status(ACCEPTED).send({
                error: false,
                task
            });
        } catch(e) {
            return res.status(BAD_REQUEST).send({
                error: true,
                message: e.message
            });
        }
        
    });

    app.delete(API_URL + ID_PREFIX, async (req, res) => {

        const { id } = req.params;
        
        try {
            const task = await Task.findByIdAndDelete(id);
            return res.status(ACCEPTED).send({
                error: false,
                task
            });
        } catch (e) {
            return res.status(BAD_REQUEST).send({
                error: true,
                message: e.message
            });
        }
    });

}