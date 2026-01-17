import express from 'express';
// This is the file that node.js loads when your application starts.


const app = express();
const port = 3000;

app.use(express.json());//It parses incoming JSON data into a JavaScript object
//“Parsing JSON” means reading JSON text and converting it into a usable JavaScript data structure (object/array).

let teaData = [];
let nextId = 1;

// add a new tea
app.post('/teas', (req, res) => {
    const { name, price } = req.body
    const newTea = { id: nextId++, name, price }
    teaData.push(newTea);
    res.status(201).send(newTea);
});

// get all tea
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData);
})

// get a single tea based on the id.
app.get('/teas/:id',(req,res)=>{// If anything is sent via the URL we use the params to extract it.
    const tea=teaData.find(t=>t.id === parseInt(req.params.id))

    if(!tea){
        return res.status(404).send("No tea found!")
    }
    res.status(200).send(tea);
})

// Update

app.put('/teas/:id',(req,res)=>{// put is kind of a mixture of get and post and this is called the business logic.
    const tea=teaData.find(t=>t.id === parseInt(req.params.id))

    if(!tea){
        return res.status(404).send("No tea found!")
    }
    const {name,price}=req.body
    tea.name=name
    tea.price=price
    res.status(200).send(tea);
})

// Delete
// With this all the crud OPERATIONS WILL BE EXECUTED

app.delete('/teas/:id',(req,res)=>{
    const index=teaData.findIndex(t=>t.id===parseInt(req.params.id));
    if(index===-1){
        return res.status(404).send("tea not found!")
    }
    teaData.splice(index,1);
    return res.status(204).send("tea data deleted!")
})


app.listen(port, () => {
    console.log(`Server is running at port:${port}...`);
})