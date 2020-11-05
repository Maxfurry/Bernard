import jwt, { TokenExpiredError } from 'jsonwebtoken';
import dotenv from 'dotenv';
import createUser from './createUser';
import bcrypt from 'bcryptjs';
import pool from '../../../models/db';
import {validatePatientSignup, validateDoctorSignup} from '../../../middleware/signup.validation';

dotenv.config();


/**
 * @class Authentication
 *
 * @description Signup  Authentication for users
 */

class Authentication{

    /**
    * @static
    *
    * @description Sign up for patient
    * @memberOf Authentication
    */

    static async PatientSignup(req, res){
        const {username, first_name, middle_name, last_name,age, gender, occupation, password} = req.body;
        const user_type = 'patient';

        const signupValidationTest = validatePatientSignup({first_name, middle_name, last_name, age, gender, occupation, password});
        if(signupValidationTest.error) return res.status(400).json({
            status: "validation error",
            code: 400,
            message: signupValidationTest.error.message
        })

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const createdUser = await createUser({username, password: hashedPassword, user_type});

            if(createdUser.error){
                return res.status(createdUser.code).json({
                    status: "error",
                    code: createdUser.code,
                    message: createdUser.message
                })
            }

            const user_id = createdUser.data.id;
            const createUserQuery = `INSERT INTO patient (user_id, first_name, middle_name, last_name, age, gender, occupation) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
            const values = [user_id, first_name, middle_name, last_name, age, gender, occupation];
            const signedUpUser = await pool.query(createUserQuery, values);

            jwt.sign({user_id, username, user_type},
                process.env.AUTHKEY, {expiresIn: '30d'}, (error, token) => {
                    if(error){
                       return res.status(401).json({
                           status: "token error",
                           error: error
                       })
                    }

                    return res.status(200).json({
                        status: "success",
                        code: 200,
                        user_details:{
                            user_id,
                            username,
                            user_type
                        },
                        data: signedUpUser.rows[0],
                        token: token
                    })

            })
        } catch (error) {
           return res.status(500).json({
                status: "Internal Server Error",
                code: 500
            })
        }
    }


     /**
    * @static
    *
    * @description Sign up for doctors
    * @memberOf Authentication
    */

    static async DoctorSignup(req, res){
        const {username, first_name, middle_name, last_name, experience, password} = req.body;
        const user_type = 'doctor';

        const signupValidationTest = validateDoctorSignup({first_name, middle_name, last_name, experience, password});
        if(signupValidationTest.error) return res.status(400).json({
            status: "validation error",
            code: 400,
            message: signupValidationTest.error.message
        })

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const createdUser = await createUser({username, password: hashedPassword, user_type});

            if(createdUser.error){
                return res.status(createdUser.code).json({
                    status: "error",
                    code: createdUser.code,
                    message: createdUser.message
                })
            }

            const user_id = createdUser.data.id;
            const createUserQuery = `INSERT INTO doctor (user_id, first_name, middle_name, last_name, experience) VALUES($1, $2, $3, $4, $5) RETURNING *`;
            const values = [user_id, first_name, middle_name, last_name, experience];
            const signedUpUser = await pool.query(createUserQuery, values);

            jwt.sign({user_id, username, user_type},
                process.env.AUTHKEY, {expiresIn: '30d'}, (error, token) => {
                    if(error){
                       return res.status(401).json({
                           status: "token error",
                           error: error
                       })
                    }

                    return res.status(200).json({
                        status: "success",
                        code: 200,
                        user_details:{
                            user_id,
                            username,
                            user_type
                        },
                        data: signedUpUser.rows[0],
                        token: token
                    })

            })
        } catch (error) {
           return res.status(500).json({
                status: "Internal Server Error",
                code: 500
            })
        }
    }


        /**
    * @static
    *
    * @description Sign up for nurse
    * @memberOf Authentication
    */

   static async NurseSignup(req, res){
    const {username, first_name, middle_name, last_name, experience, password} = req.body;
    const user_type = 'nurse';

    const signupValidationTest = validateDoctorSignup({first_name, middle_name, last_name, experience, password});
    if(signupValidationTest.error) return res.status(400).json({
        status: "validation error",
        code: 400,
        message: signupValidationTest.error.message
    })

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = await createUser({username, password: hashedPassword, user_type});

        if(createdUser.error){
            return res.status(createdUser.code).json({
                status: "error",
                code: createdUser.code,
                message: createdUser.message
            })
        }

        const user_id = createdUser.data.id;
        const createUserQuery = `INSERT INTO nurse (user_id, first_name, middle_name, last_name, experience) VALUES($1, $2, $3, $4, $5) RETURNING *`;
        const values = [user_id, first_name, middle_name, last_name, experience];
        const signedUpUser = await pool.query(createUserQuery, values);

        jwt.sign({user_id, username, user_type},
            process.env.AUTHKEY, {expiresIn: '30d'}, (error, token) => {
                if(error){
                   return res.status(401).json({
                       status: "token error",
                       error: error
                   })
                }

                return res.status(200).json({
                    status: "success",
                    code: 200,
                    user_details:{
                        user_id,
                        username,
                        user_type
                    },
                    data: signedUpUser.rows[0],
                    token: token
                })

        })
    } catch (error) {
       return res.status(500).json({
            status: "Internal Server Error",
            code: 500
        })
    }
}
}

export default Authentication;