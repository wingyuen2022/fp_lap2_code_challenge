DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id serial PRIMARY KEY,
    title varchar(512) not null,
    name varchar(512) not null,
    story varchar(1024) not null
);