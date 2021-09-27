CREATE DATABASE appoinment;

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  mobile VARCHAR(10) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
);


CREATE TABLE doctor(
  doctor_id SERIAL PRIMARY KEY,
  doctor_name VARCHAR(255) NOT NULL, 
  doctor_mobile VARCHAR(10) NOT NULL, 
  doctor_availableDate VARCHAR[] NOT NULL,
  doctor_category VARCHAR(255) NOT NULL
);


CREATE TABLE userscheduling(
   user_id SERIAL PRIMARY KEY,
   email VARCHAR(255) NOT NULL,
   doctor VARCHAR(255) NOT NULL,
   time VARCHAR(255) NOT NULL,
   name VARCHAR(255) NOT NULL,
   date VARCHAR(255) NOT NULL,
   mobile VARCHAR(10) NOT NULL
);


-- //Inserted Doctor Details 
    


        --  1 | Sheela      | 9988776655    | {2021-10-29,2021-09-30} | General
        --  2 | Meera       | 7788990066    | {2021-10-30,2021-09-31} | Ortho
        --  3 | Sheela      | 9988776655    | {2021-10-29,2021-09-30} | Dental
        --  4 | Hema        | 7339467070    | {2021-10-30,2021-10-01} | General
        --  5 | Meena       | 7788990066    | {2021-09-30,2021-09-31} | General

