const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
  },
  body: JSON.stringify({
    model: 'llama3-8b-8192',
    max_tokens: 1024,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages
    ],
  }),
})

const data = await response.json()
return {
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify({
    reply: data.choices?.[0]?.message?.content || 'Sorry, try again!'
  }),
}