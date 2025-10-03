to start server: cd into server, cmd prompt: npm start
to start client: cmd prompt: npm run build ... npm run dev

Setup

1. Copy `.env.example` to `.env` at the project root and fill in your Postgres credentials:

   PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE

2. From the `server/` folder run `npm install` (already required) and then:

   npm run reset

   This will create and seed the `gifts` table. The reset script expects a Postgres server reachable at the values in your `.env` file.

If you don't have Postgres locally, you can use a hosted Postgres and provide its connection details.
