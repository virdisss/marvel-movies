## The Assignment

We will need a web server that will answer these questions:

1. Which Marvel movies did each actor play in?
2. Actors who played more than one Marvel character?

### Prerequisites

Make sure you have docker/docker-compose installed in your machine

#### How to run the app (installation)

To run the application follow these steps:

- Go to the project root directory
- run the command: npm install
- run the command: docker-compose build
- run the command: docker-compose up -d

#### Run Test

Make sure to have docker-compose up and running first and then run npm test in the project root directory

#### Usage

The Server base url

```
http://localhost:3090
```

Available enpoints:

```
List of movies that an actor has played in

GET /api/actors/search/movie?name=any-actor-name
```

| Parameter | Type     | Description                                                      |
| :-------- | :------- | :--------------------------------------------------------------- |
| `name`    | `string` | **Required**. The actor's name you want to fetch the movies from |

```
Actors who played more than one Marvel character

GET /api/actors/characters?min=2
```

| Parameter | Type     | Description                                                             |
| :-------- | :------- | :---------------------------------------------------------------------- |
| `min`     | `number` | **Required**. the minimum of characters an actor has played (default 2) |

#### Status Codes

The applications returns the following status codes in its API:

| Status Code | Description             |
| :---------- | :---------------------- |
| 200         | `OK`                    |
| 400         | `BAD REQUEST`           |
| 404         | `NOT FOUND`             |
| 500         | `INTERNAL SERVER ERROR` |
