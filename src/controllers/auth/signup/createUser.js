import pool from '../../../models/db';

const createUser = async (user) =>{
    const {username, password, user_type} = user;
    if(!username, !password, !user_type) {
        return {
            error: true,
            code: 400,
            message: 'All fields required'
        }
    };
    try{
        const checkUserExistQuery = `SELECT * FROM users WHERE username=$1`;
        const checkValue = [username];
        const checkedResult = await pool.query(checkUserExistQuery, checkValue);
        if(checkedResult.rows[0]){
            return {
                error: true,
                code: 400,
                message: 'username has been taken'
            }
        }else{
            const createUserQuery = `INSERT INTO users (username, password, user_type) VALUES($1, $2, $3) RETURNING *`;
            const values = [username, password, user_type];
            const signedUpUser = await pool.query(createUserQuery, values);
            return {
                status: 'success',
                error: false,
                code: 200,
                message: "user created successfully",
                data: signedUpUser.rows[0]
            }
        }
    }catch(error){
        return {
            error: true,
            status: 'Internal server error',
            code: 400,
            message: error
        }
    }

}

export default createUser;