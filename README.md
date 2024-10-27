# YaYa Wallet Webhook Integration

This is an Express.js application that integrates with the YaYa Wallet payment system to receive and process webhook notifications about transactions.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Security](#security)
- [License](#license)

## Features

- Receives webhook notifications from YaYa Wallet.
- Validates the incoming requests using HMAC SHA256 signatures.
- Stores transaction data in a PostgreSQL database.

## Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL database
- An account with YaYa Wallet to obtain a secret key for signature verification

## Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. **Install dependencies:**

npm install

3. **Create a .env file::**
    ```bash
    DATABASE_URL=postgres://username:password@localhost:5432/mydatabase
    YAYA_SECRET=your_secret_key

  Replace username, password, and mydatabase with your PostgreSQL credentials and database name. Set your_secret_key to the secret key provided by YaYa Wallet.

4. **Database Migration:**

 - Create migration files:

If you haven't already created a migration file for the webhook_transactions table, you can create it using the following command:

    ```bash
    npx knex migrate:make create_webhook_transactions_table

 - Update the migration file:

Copy the following code into the newly created migration file (located in the migrations folder):

    ```

    exports.up = function(knex) {
    return knex.schema.createTable('webhook_transactions', (table) => {
      table.uuid('id').primary();
      table.integer('amount').notNullable();
      table.string('currency', 3).notNullable(); // Assuming a 3-character currency code
      table.timestamp('created_at_time').notNullable();
      table.timestamp('timestamp').notNullable();
      table.string('cause').notNullable();
      table.string('full_name').notNullable();
      table.string('account_name').notNullable();
      table.string('invoice_url').notNullable();
      table.timestamp('received_at').defaultTo(knex.fn.now());
    });
};


exports.down = function(knex) {
    return knex.schema.dropTableIfExists('webhook_transactions');
};




- Run the migration:

    Execute the following command to create the webhook_transactions table in your PostgreSQL database:

    ```
    npx knex migrate:latest
    Usage
**Start the server:**

    ```
    node index.js
The server will run on http://localhost:3000.
**Exposing Your Local Server**
To expose your local server to the internet and use HTTPS, you can use ngrok. Here’s how:

Install ngrok: If you haven't already, download and install ngrok from ngrok.com.

Start ngrok: Open a new terminal window and run the following command:

ngrok http 3000
This command will create a secure tunnel to your local server running on port 3000.

Get the HTTPS URL: After running the command, ngrok will provide you with a forwarding URL that looks something like this:


Forwarding                    https://abc123.ngrok.io -> http://localhost:3000
Register the webhook URL with YaYa Wallet: In your YaYa Wallet dashboard, register the webhook endpoint to receive notifications. Use the ngrok HTTPS URL, e.g., https://abc123.ngrok.io/webhook.


Register the webhook URL with YaYa Wallet:

In your YaYa Wallet dashboard, register the webhook endpoint to receive notifications. Use the URL https://abc123.ngrok.io/webhook.

## Endpoints
POST /webhook

- Receives transaction notifications from YaYa     Wallet.
- Validates the request using the signature and timestamp.
- Stores transaction details in the PostgreSQL database.
## Security
- The application verifies the signature of incoming webhook requests to ensure they are sent by YaYa Wallet. The YAYA-SIGNATURE header is used for this purpose.

- The server checks for replay attacks by validating the timestamp in the request payload.
License
This project is licensed under the MIT License - see the LICENSE file for details.






