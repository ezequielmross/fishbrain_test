# Fishbrain test API

Fishbrain test is a project to show my proficiency with software design, unit testing and web technologies like HTTP and REST.

You can find the challenge here: https://github.com/fishbrain/job-assignment-backend-engineer/blob/master/README.md

Using:

- Typescript
- Nodejs (express, joi, multer)
- Mysql (typeorm)
- Redis (bull)
- Unit testing (jest)

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies.

```bash
npm install
```

Install [docker-compose](https://docs.docker.com/compose/install/) if you don't have it

## Project overview

- `.env` environment variables
- `.env.test` test environment variables
- `/__tests__/` unit testing files (Jest)
- `/public/`
  - `index.html` open in your browser to test image upload
  - `resized` all resized images
  - `uploads` all uploaded images (check the improvements topic)
- `src/`
  - `entity/` database entities (Typeorm)
  - `jobs/` background jobs (Bull process)
    - `imageResize.ts` runs when a new image is added to the queue (Redis)
  - `middlewares/` express middlewares
    - `imageUpload.ts` responsible for managing the image upload with `Multer`
    - `routerValidator.ts` maintains standardized routes such as `{request, controller}`
    - `schemaValidator.ts` avoid wrong requests payload using `Joi` as a schema validator
  - `routes/` express routes
    - `catches.ts` handles the 3 required endpoints of the challenge
    - `version.ts` handles the server home message
  - `app.ts` express app + routes + middlewares
  - `db.ts` typeorm connection + entities management
  - `index.ts` starts the server by first trying to connect to the database and then building the routes
  - `queue.ts` handles Redis main queue for `imageResize` background work

## Possible improvements

- Not saving anything in disk
  - We know how work with disk write/read can be slow
  - I tried to work only with a buffer in the queue instead of saving to disk, but the `sharp` npm (image resize) did not help (I should probably look for an alternative)
- Pushing `.env` to GitHub is definitely a bad idea but I did just to be transparent with what I'm doing
- Having just a single entity/schema model could help more in Domain-driven design (DDD)
  - Alternative for Joi [link](https://github.com/YousefED/typescript-json-schema#readme)

## Usage

### Dev:

```bash
# Start the docker-compose with mysql and redis
npm run docker-dev
```

```bash
# Start in a new tab the backend
npm run dev
```

### Test:

```bash
# Start the docker-compose with mysql and redis
npm run docker-test
```

```bash
# Start in a new tab the test
npm run test
```

### Prod:

```bash
npm run start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
