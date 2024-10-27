const crypto = require('crypto');

function verifySignature(signature, payload) {
  const secretKey = process.env.YAYA_SECRET;

  // Concatenate all payload values into a single string
  const dataForSeal = Object.values(payload).join('');
  const signedPayload = Buffer.from(dataForSeal, 'utf-8');

  // Generate HMAC SHA256 hash using the secret key
  const hash = crypto.createHmac('sha256', secretKey).update(signedPayload).digest('hex');

  // Compare the generated hash with the YAYA-SIGNATURE header
  return hash === signature;
}

module.exports = { verifySignature };
