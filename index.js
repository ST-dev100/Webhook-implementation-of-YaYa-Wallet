const express = require('express');
const { Pool } = require('./db/connection'); // Import the database connection
const webhookRouter = require('./routes/webhook'); // Import the webhook routes
require('dotenv').config();

const app = express();
app.use(express.json());

// Use the webhook router
app.use('/webhook', webhookRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
