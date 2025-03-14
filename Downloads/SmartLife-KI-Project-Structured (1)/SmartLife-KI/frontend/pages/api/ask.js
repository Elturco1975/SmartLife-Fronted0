export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userMessage = req.body.message;
    const response = await fetch('http://localhost:5000/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await response.json();
    res.status(200).json({ response: data.response });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
