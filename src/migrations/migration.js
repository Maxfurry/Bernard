const createUserTable = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS
    users(
        id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        username VARCHAR(20) NOT NULL UNIQUE,
        password VARCHAR(20) NOT NULL,
        user_type VARCHAR(20) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
`
const createPatientTable = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS
    patient(
        id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL,
        first_name VARCHAR(20) NOT NULL,
        middle_name VARCHAR(20) NULL,
        last_name VARCHAR(20) NOT NULL,
        age int NULL,
        gender VARCHAR(10) NOT NULL DEFAULT 'male',
        occupation VARCHAR(20) NULL,
        FOREIGN KEY (user_id) REFERENCES "users" (id) ON DELETE CASCADE
        );
        `

const createDoctorTable = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS
    doctor(
        id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL,
        first_name VARCHAR(20) NOT NULL,
        middle_name VARCHAR(20) NULL,
        last_name VARCHAR(50) NOT NULL,
        experience int NOT NULL,
        FOREIGN KEY (user_id) REFERENCES "users" (id)  ON DELETE CASCADE
    );
`

const createNurseTable = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS
    nurse(
        id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        middle_name VARCHAR(50) NULL,
        last_name VARCHAR(50) NOT NULL,
        experience int NOT NULL,
        FOREIGN KEY (user_id) REFERENCES "users" (id) ON UPDATE CASCADE ON DELETE CASCADE
    );
`

const createSpecialityTable = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS
    speciality(
        id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        speciality_field VARCHAR(50) NOT NULL
    );
`
const createSubSpecialityTable = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS
    sub_speciality(
        id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        speciality_id UUID NOT NULL,
        sub_speciality VARCHAR(50) NOT NULL,
        FOREIGN KEY (speciality_id) REFERENCES "speciality" (id) ON DELETE CASCADE
    );
`

const createDoctorSpecialityTable = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS
    doctor_speciality(
        doctor_id UUID NOT NULL,
        speciality_id UUID NOT NULL,
        sub_speciality_id UUID NOT NULL,
        FOREIGN KEY (doctor_id) REFERENCES "doctor" (id) ON DELETE CASCADE,
        FOREIGN KEY (speciality_id) REFERENCES "speciality" (id) ON DELETE CASCADE,
        FOREIGN KEY (sub_speciality_id) REFERENCES "sub_speciality" (id) ON DELETE CASCADE
    )
`

const createNurseSecialityTable = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS
    nurse_speciality(
        nurse_id UUID NOT NULL,
        speciality_id UUID NOT NULL,
        sub_speciality_id UUID NOT NULL,
        FOREIGN KEY (nurse_id) REFERENCES "doctor" (id)  ON DELETE CASCADE,
        FOREIGN KEY (speciality_id) REFERENCES "speciality" (id)  ON DELETE CASCADE,
        FOREIGN KEY (sub_speciality_id) REFERENCES "sub_speciality" (id) ON DELETE CASCADE
    )
`

const migrate = async pool =>{
    try{
        await pool.query(createUserTable);
        await pool.query(createPatientTable);
        await pool.query(createDoctorTable);
        await pool.query(createNurseTable);
        await pool.query(createSpecialityTable);
        await pool.query(createSubSpecialityTable);
        await pool.query(createDoctorSpecialityTable);
        await pool.query(createNurseSecialityTable);
     return true
    }catch(error){
        throw error;
    }
}

export default migrate;