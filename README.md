
# User Data API

A simple Node.js API using Express and MongoDB to manage user data.

## Features

- **Fetch User Data by Customer ID**
- **Fetch All Users Data**

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Cors**

## Project Structure

```
project-root/
├── config/
│   └── database.js
├── controllers/
│   └── getUserData.js
├── models/
│   └── userData.js
├── routes/
│   └── dataRoutes.js
├── .env
├── index.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/user-data-api.git
   cd user-data-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with your configuration:

   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ```

### Running the App

```bash
npm start
```

The server runs on `http://localhost:3000`.

## API Endpoints

- **POST** `/user/data` - Fetch user data by customer ID.
- **GET** `/user/all` - Fetch all users data.

