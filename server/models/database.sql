CREATE DATABASE welbex;

CREATE TABLE info(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    count INTEGER NOT NULL,
    distance INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);