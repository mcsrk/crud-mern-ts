# Shop Web App

## MERN ( Using TypeScript )

Made using with Node v16.18.1

## Environment Variables

### ./server

To run this project, you will need to add the following environment variables to your .env file inside the backend folder

-   `JWT_SECRET` - A custom string to act a secret to hash encrypt the passwords on db safely
-
-   `MONGO_USERNAME` - The admin username to access mongo cluster

-   `MONGO_PASSWORD` - The admin password to access mongo cluster

Also you will need to change you cluster_id and provider:

```js

@<your_cluster_name>.<your_cluster_provider>.mongodb.net

```

located at the `config/config.ts` file:

```js
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@<your_cluster_name>.<your_cluster_provider>.mongodb.net/db`;
```

### ./client

To run this project, you will need to add the following environment variables to your `.env.development` file inside the `./client` folder

-   `VITE_BACKEND_URL` - Url to connect the backend (usually is [http://localhost:8000](http://localhost:8000))
-
-   `VITE_PRORUCTS_URL` - Url to connect the fake products api [https://fakestoreapi.com/products](https://fakestoreapi.com/products)

## Setup

### ./server

Install required packages

```sh

npm  i

```

### ./client

Install required packages

```sh

npm  i

```

## Run Locally

### ./server

Once setup the server, you should be able to run the project by running:

```sh

nodemon

```

### ./client

Once setup the client, you should be able to run the project by running:

```sh

npm run dev

```
