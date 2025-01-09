CREATE TABLE "task" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"authorId" uuid NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "task" DROP CONSTRAINT "task_author_users_id_fk";
--> statement-breakpoint
ALTER TABLE "subtask" ADD CONSTRAINT "subtask_post_id_posts_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."task"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtask" ADD CONSTRAINT "subtask_author_id_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;