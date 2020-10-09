CREATE TABLE USERS( id serial PRIMARY KEY,
                    email VARCHAR ( 50 ),
                    password TEXT,
                    first_name TEXT,
                    last_name TEXT,
                    profile_pic TEXT );
CREATE TABLE CALENDER( id serial PRIMARY KEY,
                       cal_id integer REFERENCES USERS(id),
                       event VARCHAR ( 250 ),
                       created_at timestamp,
                       team_name TEXT );
CREATE TABLE FEED( id serial PRIMARY KEY,
                   users_id integer REFERENCES USERS(id),
                   content VARCHAR ( 250 ),
                   image_url TEXT,
                   created_at timestamp );