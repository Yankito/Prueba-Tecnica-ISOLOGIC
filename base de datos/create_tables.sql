-- Script SQL para crear las tablas 'user' y 'task'
-- Se utiliza PostgreSQL

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" character varying NOT NULL UNIQUE,
    "password" character varying NOT NULL
);

CREATE TABLE "task" (
    "id" SERIAL PRIMARY KEY,
    "title" character varying NOT NULL,
    "description" text,
    "dueDate" timestamp without time zone,
    "isCompleted" boolean NOT NULL DEFAULT false,
    -- Clave foránea que enlaza la tarea con un usuario
    "userId" integer REFERENCES "user" ("id") ON DELETE CASCADE
);