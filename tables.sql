CREATE TABLE IF NOT EXISTS users (
	user_id SERIAL PRIMARY KEY,
	username TEXT,
	password TEXT
);

CREATE TABLE IF NOT EXISTS itineraries (
	iti_id SERIAL PRIMARY KEY,
	itiname TEXT,
	country TEXT,
	season TEXT,
	experience TEXT,
	user_id INTEGER
);

CREATE TABLE IF NOT EXISTS details (
	id SERIAL PRIMARY KEY,
	day INTEGER,
	places TEXT,
	iti_id INTEGER
);

CREATE TABLE IF NOT EXISTS photos (
	id SERIAL PRIMARY KEY,
	photo_url TEXT,
	details_id INTEGER
);