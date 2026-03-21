exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { messages, systemPrompt } = JSON.parse(event.body)

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
  { role: 'system', content: systemPrompt || '' },
  ...messages.map(m => ({
    role: m.role,
    content: m.content || m.text || ''
  }))
],
      }),
    })

    const data = await response.json()
    console.log('Groq response:', JSON.stringify(data))

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        reply: data.choices?.[0]?.message?.content || 'Sorry, try again!'
      }),
    }
  } catch (err) {
    console.log('Error:', err.message)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: err.message,
        reply: 'Sorry, something went wrong!'
      }),
    }
  }
}