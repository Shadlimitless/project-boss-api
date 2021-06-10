const checkMillionDollarIdea = (req, res, next) => {
    const idea = req.body;
    console.log(`Running milliondollar val ${idea}`);
    if(!idea || !idea.numWeeks || !idea.weeklyRevenue) {
        res.status(400).send({error: 'idea is not valuable enough'});
    } else {
        const ideaVal = idea.numWeeks * idea.weeklyRevenue;
        if(!ideaVal || ideaVal < 1000000){
            res.status(400).send({error: 'idea is not valuable enough'});
        } else {
            next();
        }
    }

    
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
