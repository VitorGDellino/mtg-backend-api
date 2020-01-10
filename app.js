const PORT = 5000;
const express = require('express');
const parser = require('body-parser');
const db = require('./db/db');

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended : false }));

app.get('/mtg/card/all', (req, res) => {
    res.status(200).send({
        error : false,
        message : 'Cards retrieved successfully',
        cards : db.cards
    });
});

app.post('/mtg/card/create', (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            error : true,
            message : "Card's name is required",
        });
    }else if(!req.body.manaCost){
        return res.status(400).send({
            error : true,
            message : "Card's mana cost is required",
        });
    }else if(!req.body.cmc){
        return res.status(400).send({
            error : true,
            message : "Card's coverted mana cost is required",
        });
    }else if(!req.body.type){
        return res.status(400).send({
            error : true,
            message : "Card's mana cost is required",
        });
    }else if(!req.body.rarity){
        return res.status(400).send({
            error : true,
            message : "Card's rarity cost is required",
        });
    }else if(!req.body.text){
        return res.status(400).send({
            error : true,
            message : "Card's text cost is required",
        });
    }else if(!req.body.artist){
        return res.status(400).send({
            error : true,
            message : "Card's artist cost is required",
        });
    }else if(!req.body.imageUrl){
        return res.status(400).send({
            error : true,
            message : "Card's image cost is required",
        });
    }

    let card = req.body;
    card.id = db.cards[parseInt(db.cards.length) - 1].id + 1;

    db.cards.push(card);

    return res.status(201).send({
        error : false,
        message : "Card inserted successfully"
    });

});

app.delete('/mtg/card/delete/:id', (req, res) => {
    const id = req.params.id;
    let card;
    let error = true;

    db.cards.map((e, i) => {
        if(parseInt(id) === parseInt(e.id)){
            error = false;
            card = db.cards.splice(i, 1);
            return res.status(200).send({
                error : false,
                message : "Card deleted successfully",
                card : card 
            });
        }
    });

    if(error){
        return res.status(404).send({
            error : true,
            message : "Card not found"
        });
    }

});

app.put('/mtg/card/update/:id', (req, res) => {
    const id = req.params.id;

    if(!req.body.name) {
        return res.status(400).send({
            error : true,
            message : "Card's name is required",
        });
    }else if(!req.body.manaCost){
        return res.status(400).send({
            error : true,
            message : "Card's mana cost is required",
        });
    }else if(!req.body.cmc){
        return res.status(400).send({
            error : true,
            message : "Card's coverted mana cost is required",
        });
    }else if(!req.body.type){
        return res.status(400).send({
            error : true,
            message : "Card's mana cost is required",
        });
    }else if(!req.body.rarity){
        return res.status(400).send({
            error : true,
            message : "Card's rarity cost is required",
        });
    }else if(!req.body.text){
        return res.status(400).send({
            error : true,
            message : "Card's text cost is required",
        });
    }else if(!req.body.artist){
        return res.status(400).send({
            error : true,
            message : "Card's artist cost is required",
        });
    }else if(!req.body.imageUrl){
        return res.status(400).send({
            error : true,
            message : "Card's image cost is required",
        });
    }

    let error = true;
    let card = req.body;
    card.id = parseInt(id);

    db.cards.map((e, i) => {
        if(parseInt(id) === parseInt(e.id)){
            error = false;
            db.cards.splice(i, 1, card);
            return res.status(201).send({
                error : false,
                message : "Card updated successfully",
                card : card
            });
        }
    });

    if(error){
        return res.status(404).send({
            error : true,
            message : "Card not found"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});