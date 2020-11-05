import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pool from '../../../models/db';
import loginValidationTest from '../../../middleware/loginValidationTest';

dotenv.config();


/**
 * @class Authentication
 *
 * @description Signup  Authentication for users
 */

class Authentication {

    /**
    * @static
    *
    * @description login for users
    * @memberOf Authentication
    */

    static async Login(req, res) {
        const { username, password } = req.body;
        const loginValidationTestResult = loginValidationTest({ username, password });
        if (loginValidationTestResult.error) return res.status(400).json({
            status: "validation error",
            code: 400,
            message: loginValidationTestResult.error.message
        })

        try {

            const checkUser = `SELECT * from users WHERE username=$1`;
            const value = [username];
            const checkedUserResult = await pool.query(checkUser, value);

            if (!checkedUserResult.rows[0]) {
                return res.status(400).json({
                    status: 'bad request',
                    message: 'incorrect email or password',
                });
            }


            const match = await bcrypt.compare(password, checkedUserResult.rows[0].password);
            if(match){
                jwt.sign({ user_id: checkedUserResult.rows[0].user_id, username: checkedUserResult.rows[0].username, user_type : checkedUserResult.rows[0].user_type },
                    process.env.AUTHKEY, { expiresIn: '30d' }, (error, token) => {
                        if (error) {
                            return res.status(401).json({
                                status: "token error",
                                error: error
                            })
                        }
                        return res.status(200).json({
                            status: "success",
                            code: 200,
                            data: checkedUserResult.rows[0],
                            token: token
                        })
                    })
            }
        } catch (error) {
            return res.status(500).json({
                status: "Internal Server Error",
                code: 500
            })
        }
    }

}

export default Authentication;