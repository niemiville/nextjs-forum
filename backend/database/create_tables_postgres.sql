CREATE TABLE "thread" (
	"id" serial NOT NULL,
	"title" TEXT NOT NULL,
	"user_id" int,
	"creation_timestamp" TIMESTAMP,
	"modified_timestamp" TIMESTAMP,
	"number_of_reads" int DEFAULT '0',
	CONSTRAINT "thread_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "message" (
	"id" serial NOT NULL,
	"thread_id" int NOT NULL,
	"user_id" int,
	"text" TEXT NOT NULL,
	"likes" int DEFAULT '0',
	"dislikes" int DEFAULT '0',
	"creation_timestamp" TIMESTAMP,
	"modified_timestamp" TIMESTAMP,
	CONSTRAINT "message_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user" (
	"user_id" serial NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"creation_timestamp" TIMESTAMP,
	"modified_timestamp" TIMESTAMP,
	CONSTRAINT "user_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "thread" ADD CONSTRAINT "thread_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("user_id");

ALTER TABLE "message" ADD CONSTRAINT "message_fk0" FOREIGN KEY ("thread_id") REFERENCES "thread"("id");
ALTER TABLE "message" ADD CONSTRAINT "message_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("user_id");





