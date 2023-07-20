# Payever Backend Test

## API Documentation

#### create user

This route saves a user record in the MongoDB database. Upon creation, it sends a welcome message to the user's email and also emits an event to RabbitMQ.

```http
  POST /api/users
```

| params       | type     | mandatory |
| :----------- | :------- | :-------- |
| `email`      | `string` | true      |
| `first_name` | `string` | true      |
| `last_name`  | `string` | true      |
| `avatar`     | `file`   | false     |

#### get user

This route retrieves data from the reqres API and returns a user.

```http
  GET /user/{id}
```

#### get user avatar

This route returns the user's avatar as a base64 encoded string.

```http
  GET /user/{id}/avatar
```

#### delete user avatar

This route removes the user's avatar from the file system storage and MongoDB.

```http
  DELETE /user/{id}/avatar
```

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test
```

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
