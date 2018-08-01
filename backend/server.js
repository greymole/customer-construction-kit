//import express from 'express'
import Issue from './models/Issue';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:4000/issues');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection succesfully established!');
});

app.use('/', router);


//*****Routing*******
        router.route('/issues').get((req, res) => {
        Issue.find((err, issues) => {
            if (err)
                console.log(err);
            else
                res.json(issues);
        });
        });

        router.route('/issues/:id').get((req, res) => {
        Issue.findById(req.params.id, (err, issue) => {
            if (err)
                console.log(err);
            else
                res.json(issue);
        })
        });

        router.route('/issues/add').post((req, res) => {
        let issue = new Issue(req.body);
        issue.save()
            .then(issue => {
                res.status(200).json({'issue': 'Added successfully'});
            })
            .catch(err => {
                res.status(400).send('Failed to create new record');
            });
        });


app.listen(4000, () => console.log(`Express server running on port 4000`));