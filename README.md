# Shop Web App

## MERN ( Using TypeScript )

Made using with Node v16.18.1

## Environment Variables

### Server

To run this project, you will need to add the following environment variables to your .env file inside the backend folder

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

## Setup

### Server

Install required packages

```sh

npm  i

```

## Run Locally

### Server

Once setup, you should be able to run the project by running:

```sh

nodemon

```
