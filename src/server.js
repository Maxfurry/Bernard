import express from 'express';


const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res)=>{
     res.status(200).json({
        version: 1,
        status: 'success',
        code: 200,
        message: 'hospital management api'
    })
})

app.all('*', (req, res)=>{
     res.status(404).json({
        status: 'not found',
        code: 404,
        message: 'route not found'
    })
})

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
})
