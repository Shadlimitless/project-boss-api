const express = require('express');
const minionsRouter = express.Router();
const db = require('../server/db')



minionsRouter.get('/', (req, res)=>{
    res.status(200).send(db.getAllFromDatabase('minions'));
})

minionsRouter.post('/', (req, res)=>{
    let minion = req.body;
    try {
        const savedMinion = db.addToDatabase('minions', minion);
        res.status(201).send(savedMinion);
    } catch(e){
        console.error(e);
        res.status(500).send();
    }
})

//middleware that validates minionId
minionsRouter.param('minionId', (req, res, next, id)=>{
    const foundMinion = db.getFromDatabaseById('minions', id);
    if(!foundMinion) {
        res.status(404).send({error: 'minion not in DB'})
    } else {
        req.foundMinion = foundMinion;
        next();
    }
})

minionsRouter.get('/:minionId', (req, res)=>{
    res.status(200).send(req.foundMinion);
})

minionsRouter.put('/:minionId', (req, res)=>{
    const updatedMinion = db.updateInstanceInDatabase('minions', req.body);
    res.status(201).send(updatedMinion);
})

minionsRouter.delete('/:minionId', (req, res)=>{
    const deleted = db.deleteFromDatabasebyId('minions', req.foundMinion.id);
    if(deleted){
        res.status(204).send();
    } else {
        res.status(500).send({error: 'An error occured while deleting'});
    }
})

minionsRouter.get('/:minionId/work', (req, res)=>{
    const minionWork = db.getFromDatabaseById('work', req.foundMinion.id);
    let response =[];
    if(minionWork){
        response.push(minionWork);
    } 
    res.status(200).send(response);
    
})

minionsRouter.post('/:minionId/work', (req, res)=>{
    const sentWork = req.body;
    sentWork.minionId = req.foundMinion.id;
    const work = db.addToDatabase('work', sentWork);
    res.status(201).send(work);

})

//middleware that checks routes with workId as param
minionsRouter.param('workId', (req, res, next, id)=>{
    const minionWork = db.getFromDatabaseById('work', id);
    if(!minionWork){
        res.status(404).send({error: 'work doesnt exist for this minion'});
    } else {
        req.minionWork = minionWork;
        next();
    }
})

minionsRouter.put('/:minionId/work/:workId', (req, res)=>{
    try {
        const updatedWork = db.updateInstanceInDatabase('work', req.body);
        res.status(201).send(updatedWork);
    } catch(err){
        res.status(400).send({error:err.message})
    }
    
})

minionsRouter.delete('/:minionId/work/:workId', (req, res)=> {
    const deleted = db.deleteFromDatabasebyId('work', req.minionWork.id);
    console.log(deleted);
    if(deleted){

        res.status(204).send();
    } else {
        res.status(500).send({error: 'An error occured while deleting work from DB'});
    } 
})


module.exports = minionsRouter;
