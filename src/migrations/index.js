import migrate from '../migrations/migration';
import pool from '../models/db';

(async function (){
    try{
        await migrate(pool);
        console.log('database Migrated');
        process.exit();
    }catch(error){
        console.log(`Error occured , more details ${error}`)
    }
})()