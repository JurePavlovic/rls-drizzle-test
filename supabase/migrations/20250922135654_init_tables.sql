--> statement-breakpoint
CREATE TABLE "users_data" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"username" text,
	"profile_image_url" text,
	"profile_image_blurhash" text,
	"email" text NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL,
	"completed_onboarding" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_data_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "users_data" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "todos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"priority" integer DEFAULT 0 NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "todos" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "users_data" ADD CONSTRAINT "users_data_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "todos" ADD CONSTRAINT "todos_user_id_users_data_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_data"("id") ON DELETE no action ON UPDATE no action;
