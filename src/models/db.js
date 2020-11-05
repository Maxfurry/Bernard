import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let pool;

if(process.env.NODE_ENV === 'development'){
    pool = new Pool({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    })
}else{
    let connectionString = process.env.DB_URL;
    pool = new Pool({
        connectionString
    })
}

pool.on('connect', ()=>{
    console.log(`DB connected`)
})

export default pool;