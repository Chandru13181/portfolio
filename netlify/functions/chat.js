const SYSTEM = `You are Chandru's AI assistant. Chandru M is a UI/UX Designer & Frontend Developer from Chennai with 3+ years experience. Skills: Figma, React, Adobe XD, JavaScript, Motion Design. Services: UI/UX Design, Web Design, Mobile App Design, Branding, Prototyping, React Development. 20+ projects, 15+ clients, 5-star rating. Contact: chandruwebdesigner@gmail.com, +91 93611 98301. Available for freelance and full-time. Be friendly and professional.`

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' }, body: '' }
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }
  try {
    const { messages } = JSON.parse(event.body)
    const groqMessages = [
      { role: 'user', content: SYSTEM + ' Confirm you understand.' },
      { role: 'assistant', content: 'Understood! I am Chandru\'s AI assistant. How can I help you? 😊' },
      ...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: String(m.content || '') }))
    ]
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({ model: 'llama-3.3-70b-versatile', max_tokens: 512, messages: groqMessages })
    })
    const data = await response.json()
    console.log('Status:', data.error ? 'ERROR: ' + data.error.message : 'OK')
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ reply: data.choices?.[0]?.message?.content || 'Sorry, try again!' })
    }
  } catch (err) {
    console.log('Error:', err.message)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ reply: 'Sorry, something went wrong!' })
    }
  }
}