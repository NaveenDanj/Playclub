const express = require('express');
const app = express();
const PORT = 3030 || process.env.PORT;


app.get('/' , (req , res) => {
    res.send('Hello World');
})

app.listen(PORT , () => {
    console.log('Server is up and running!');
})