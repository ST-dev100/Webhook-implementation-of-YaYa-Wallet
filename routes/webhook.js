const express = require('express');
const pool = require('../db/connection');
const { verifySignature } = require('../utils/signature');

const router = express.Router();

// Webhook endpoint
router.post('/', async (req, res) => {
  const signature = req.headers['YAYA-SIGNATURE'];
  const payload = req.body;

  // Extract and verify timestamp to prevent replay attacks
  const timestamp = payload.timestamp;
  const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
  const timeDifference = currentTime - timestamp;

  if (timeDifference > 300) { // 5 minutes tolerance
    return res.status(400).send('Request timestamp too old');
  }

  // Signature verification
  if (!verifySignature(signature, payload)) {
    return res.status(400).send('Invalid signature');
  }

  res.status(200).send('Webhook received and verified'); // Quick 2xx response

  try {
    // Store data asynchronously
    await storeWebhookPayload(payload);
  } catch (error) {
    console.error('Error storing webhook data:', error);
  }
});

// Function to store webhook transaction data in the database
async function storeWebhookPayload(data) {
  const query = `
    INSERT INTO webhook_transactions (
      id, amount, currency, created_at_time, timestamp,
      cause, full_name, account_name, invoice_url, received_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `;

  const values = [
    data.id,
    data.amount,
    data.currency,
    data.created_at_time,
    data.timestamp,
    data.cause,
    data.full_name,
    data.account_name,
    data.invoice_url,
    new Date(),
  ];

  await pool.query(query, values);
}

module.exports = router;
