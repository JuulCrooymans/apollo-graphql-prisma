-- -------------------------------------------------------------
-- TablePlus 3.12.4(360)
--
-- https://tableplus.com/
--
-- Database: prismatest
-- Generation Time: 2021-03-14 23:08:30.8020
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."Post";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Post_id_seq";

-- Table Definition
CREATE TABLE "public"."Post" (
    "id" int4 NOT NULL DEFAULT nextval('"Post_id_seq"'::regclass),
    "title" varchar(255) NOT NULL,
    "content" text,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

INSERT INTO "public"."Post" ("id", "title", "content", "createdAt") VALUES
('10', 'test titel', 'lorem ipsum', '2021-03-14 21:53:35.602158'),
('11', 'test titel 2', 'lorem ipsum alskejf', '2021-03-14 21:54:00.458176'),
('12', 'test', 'content', '2021-03-14 22:05:30.359261'),
('13', 'test 123123', 'content', '2021-03-14 22:05:44.575926');
