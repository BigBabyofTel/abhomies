CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT '2025-08-21 06:15:37.164' NOT NULL,
	"updated_at" timestamp DEFAULT '2025-08-21 06:15:37.164' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
