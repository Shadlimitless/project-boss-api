const express = require('express');
const router = express.Router();
const db = require('../server/db');

router.get('/', (req, res)=>{
    const meetings = db.getAllFromDatabase('meetings');
    if(meetings){
        res.status(200).send(meetings);
    } else {
        res.status(404).send({error:'Data not found'});
    }
})

router.post('/', (req, res)=>{
    try{
        const meeting = db.createMeeting();
        const newMeeting = db.addToDatabase('meetings', meeting);
        res.status(201).send(newMeeting);
    }catch(err){
        res.status(500).send();
    }
    
})

router.delete('/', (req, res)=>{
    const deleted = db.deleteAllFromDatabase('meetings');
    res.status(204).send(); 
})


module.exports = router;