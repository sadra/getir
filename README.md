# Getir Assessement Test

[![Heroku](https://heroku-badge.herokuapp.com/?app=obscure-everglades-09947)]

This a Node.js project, developed by Typescript.

- [Getir Assessement Test](#getir-assessement-test)
  - [How to Run](#how-to-run)
  - [How to Run With Docker](#how-to-run-with-docker)
  - [Run Test](#run-test)
  - [API](#api)
    - [Test /](#test-)
    - [Get Records based on Query](#get-records-based-on-query)
      - [Bad Request Exception](#bad-request-exception)
      - [Not Found Exception](#not-found-exception)

## How to Run

1. Just copy `.env.example` to `.env` and fill with your einviorements:

```
PORT=8000
MONGO_URL=XXXXXXX
```

1. Install npm packages:

```bash
npm install
```

3. To run app just call following in your command line:

```bash
npm run start:dev
```

4. You can run project on production js too:

```bash
npm run start
```

## How to Run With Docker

If you like to run the project with Docker, just run `docker-compose` with envs:

```bash
PORT=8000 MONGO_URL='mongodb+srv://test:test@example.mongodb.net/test?retryWrites=true' docker-compose up -d
```

## Run Test

This tests uses `mongodb-memory-server` as a MongoDb Driver.

1. To run all the tests:

```bash
npm test
```

## API

Base Route: `https://localhost:PORT`

### Test /

Route: `/`

Method: `GET`

**Response**

Status: `200`

```json
"Hi! I am Getir :)"
```

### Get Records based on Query

Route: `/`

Method: `POST`

Body:

```json
{
  "startDate": "2020-10-01", //string, with a Date YYY-MM-DD format
  "endDate": "2020-12-01", //string, with a Date YYY-MM-DD format
  "minCount": 1000, //number
  "maxCount": 3000 //number
}
```

**Response**

Status: `200`

```json
{
  "code": 0,
  "msg": "Success",
  "records": [
    {
      "key": "AxqGywiF", //string
      "createdAt": "2016-11-30T14:47:38.027Z", //string
      "totalCount": 2653 //number
    },
    ...
  ]
}
```

#### Bad Request Exception

Yoy will recieve `400` error if you don't pass any one of body parameters with request.

Route: `/`

Method: `POST`

Body (Example):

```json
{}
```

**Response**

Status: `400`

```json
{
  "code": 400,
  "msg": "Bad Request!",
  "error": [
    "body[startDate]: must be a date with YYYY-MM-DD fromat",
    "body[endDate]: must be a date with YYYY-MM-DD fromat",
    "body[minCount]: must be a valid number",
    "body[maxCount]: must be a valid number"
  ]
}
```

#### Not Found Exception

If there were no records based on your query, you will recieve `404` error.

Route: `/`

Method: `POST`

Body (Example):

```json
{
  "startDate": "2021-01-01", //string, with a Date YYY-MM-DD format
  "endDate": "2021-01-01", //string, with a Date YYY-MM-DD format
  "minCount": 4500, //number
  "maxCount": 5000 //number
}
```

**Response**

Status: `404`

```json
{
  "code": 404,
  "msg": "There is no record!",
  "records": []
}
```
