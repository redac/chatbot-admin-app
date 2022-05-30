# Chatbot Administration CRUD App

This is a chatbot administration web app, it allows users to:

- **C**reate, **R**ead, **U**pdate and **D**elete rivescript chatbots.
- Allow the user to choose an interface to communicate with the said bots.

<a href="#" target="_blank"><img src="https://i.imgur.com/Be0l2O0.png" alt="Screenshot of the example app"/></a>

Tech stack:

- Backend: [Express](https://expressjs.com/), [Prisma ORM](https://www.prisma.io/express)
- Frontend: [React](https://reactjs.org/), [TailwindCSS](https://tailwindcss.com/)

You can see a hosted version of application on <a href="#" target="_blank">Vercel</a>.

## Getting started

### 1. Clone the repo and install the dependencies

Clone this repo:
```bash
git clone https://github.com/redac/chatbot-admin-app
cd chatbot-admin-app
```

Instal lnpm dependencies:
```bash
npm install
```

### 2. Initialize the database

Run the following command to initialize your SQLite database file and the prisma client. This also creates the `Bot` table that is defined in [`prisma/schema.prisma`](./server/prisma/schema.prisma):

```
cd server && npx prisma generate
```

### 3. Launch the application

To start the app (front and back), run the following :

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and take a look around.

### Launch the front/back end in dev mode

To start a specific part of the app (e.g.frontend), run the following :

```bash
npm run front-dev # or npm run back-dev
```

## Using the REST API

You can access the REST API of the server at `http://localhost:3030` using the following endpoints:

### `GET`

- `/api/chatbots/:id`: Fetch a single chatbot by its `id`
- `/api/chatbots`: Fetch all chatbots
- `/api/brains`: Fetch all currently loadable rivescript brains
- `/api/interfaces`: Fetch all the currently supported interfaces

### `POST`

- `/api/chatbots/`: Create a new chatbot
  - Body:
    - `name: String` (default: Steve): The name of the chatbot

### `PATCH`

- `/api/chatbots/:id`: Modify a given chatbot
  - Body:
    - `name: String` : The new name of the chatbot
    - `brain: String` : The filename of the chatbot's new brain (the file has to be in the [`public/brains`](./server/src/public/brains/) folder)
    - `web: Boolean` : The state of the bot's web interface
    - `discord: Boolean` : The state of the bot's discord interface

### `DELETE`

- `/api/chatbots/:id`: Delete a chatbot by its `id`
