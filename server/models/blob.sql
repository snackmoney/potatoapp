DROP DATABASE IF EXISTS blobs;
CREATE DATABASE blobs;

\c blobs;

CREATE TABLE IF NOT EXISTS blob (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  description VARCHAR
);

INSERT INTO blob (name, description)
  VALUES ('Initial Blob', 'Blob created during db creation.');
