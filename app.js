const express =  ('express')
app = express()

require('dotenv').config()

app.get('/', (req, res)=> {
    res.send('hello')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Lisening on Port: ${PORT}')
})