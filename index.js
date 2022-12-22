const Joi = require("joi");
const express = require('express');
const app = express();
app.use(express.json());

const accounts = [
    {id: 1, username:"Richard"},
    {id: 2, username:"Feranmi"},
    {id: 3, username:"Dosunmu"},
]

app.get('/api', (req, res) => {
    res.send("Hello World")
});

app.get('/api/courses', (req, res) => {
    res.send(accounts);
})

app.get('/api/courses/:id', (req, res) => {
    const account = accounts.find(c => c.id === parseInt(req.params.id));
    if (!account){
        res.status(404).send("No Username at this index");
    }
    res.send(account);
})


app.post('/api/courses', (req, res) => {

    const {error} = schema.validateAccount(req.body);
    if (error){
        res.status(404).send(error.details[0].message);
        return
    }

    const account = {
        id: accounts.length + 1,
        name: req.body.username
    }
    accounts.push(account);
    res.send(account);
})


app.put('/api/courses/:id', (req, res) => {
    const account = accounts.find(c => c.id === parseInt(req.params.id));
    if (!account){
        res.status(404).send("No Username at this index");
    }

    const {error} = schema.validateAccount(req.body);
    if (error){
        res.status(404).send(error.details[0].message);
        return
    }
    account.username = req.body.username;
    return res.send(account)

})


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Port ${port} Working`));

function validateAccount(accountval){

    const schema = Joi.object({
    username: Joi.string().min(3).required()
    })

    return schema.validate(accountval);
}