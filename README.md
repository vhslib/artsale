# Artsale
A dummy marketplace project

## Architecture Overview
The project is written entirely in TypeScript and consists of three parts:
- A Vue client
- An Express server
- A library which contains some shared code and types like HTTP requests & responses, validation etc.

This thing also requires a Postgres setup for it to run (`dump.sql` provided), as well as a special place for storing images somewhere in the filesystem.

## How To Build
- To build the shared stuff, do `cd shared && pnpm i && pnpm build`
- To run the client, do `cd client && pnpm i && pnpm start`
- To run the server, make sure to add a .env file (see below), then do `cd server && pnpm i && pnpm start`

## .env example
```ini
NODE_ENV="development"
DATABASE_URL="postgresql://postgres@localhost:5432/artsale"
JWT_SECRET="jfdfjosdfudfksdf"
IMAGE_STORAGE="/path/to/image/storage"
```

## Image storage
The images from the IMAGE_STORAGE dir have to be served separately on port 8888 under the `/static` prefix. [http-server](https://www.npmjs.com/package/http-server) can be used for testing.

Also, cwebp is required for image processing.
