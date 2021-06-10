const express = require('express');
const router = express.Router();
const db = require('../server/db');
const checkMillionDollarIdea = require('../server/checkMillionDollarIdea');

router.put('/:ideaId', )

router.get('/', (req, res)=>{
    const ideas = db.getAllFromDatabase('ideas');
    if(ideas){
        res.status(200).send(ideas);
    } else {
        res.status(404).send({error:'Data not found'});
    }
})

router.post('/', checkMillionDollarIdea, (req, res)=>{
    const idea = req.body;
    try{
        console.log("Posting");
        const savedIdea = db.addToDatabase('ideas', idea);
        res.status(201).send(savedIdea);
    }catch(err){
        res.status(500).send();
    }
    
})

router.param('ideaId', (req, res, next, id)=>{
    const idea = db.getFromDatabaseById('ideas', id);
    if(!idea){
        res.status(404).send({error: 'Idea not found in DB'});
    } else {
        req.idea = idea;
        next();
    }
})

router.get('/:ideaId', (req, res)=>{
    res.status(200).send(req.idea);
})

router.put('/:ideaId', checkMillionDollarIdea, (req, res)=>{
    const updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
    res.status(201).send(updatedIdea);
})

router.delete('/:ideaId', (req, res)=>{
    const deleted = db.deleteFromDatabasebyId('ideas', req.idea.id);
    if(deleted){
        res.status(204).send();
    } else {
        res.status(500).send({error: 'An error occured while deleting'});
    } 
})


module.exports = router;