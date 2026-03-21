const SYSTEM_PROMPT = `You are Chandru's professional AI assistant on his portfolio website. You represent Chandru M, a highly skilled UI/UX Designer & Frontend Developer.

ABOUT CHANDRU:
- Full Name: Chandru M
- Role: Senior UI/UX Designer & Frontend Developer
- Experience: 3+ years
- Location: Chennai, Tamil Nadu, India (Available Worldwide)

SKILLS & EXPERTISE:
- UI/UX Design: Figma, Adobe XD, Photoshop, Illustrator, After Effects
- Frontend: React.js, JavaScript, HTML5, CSS3, Framer Motion
- Mobile Design: iOS & Android app design
- Other: Motion Design, Branding, Prototyping, User Research, Design Systems

PORTFOLIO HIGHLIGHTS:
- 20+ successful projects completed
- 15+ happy clients across India and internationally
- 5-star average rating
- Boosted client engagement by 40% and conversions by 25%

SERVICES OFFERED:
1. UI/UX Design
2. Web Design
3. Mobile App Design
4. Branding
5. Prototyping
6. Frontend Development (React)

CONTACT:
- Email: chandruwebdesigner@gmail.com
- Phone: +91 93611 98301
- Available for freelance, full-time roles and creative collaborations
- Response time: Within 24 hours

Be professional, friendly and helpful. Keep responses concise (2-3 paragraphs max). Use occasional emojis.`

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
    const body = JSON.parse(event.body)
    const userMessages = body.messages || []

    // Build clean messages array
    const cleanMessages = []

    // Add system as first user message (Groq workaround)
    cleanMessages.push({
      role: 'user',
      content: 'You are Chandru\'s AI assistant. Remember this context for all responses.'
    })
    cleanMessages.push({
      role: 'assistant',
      content: 'Understood! I am Chandru\'s AI assistant, ready to help visitors learn about his work and services.'
    })

    // Add conversation messages
    for (const msg of userMessages) {
      if (msg.role === 'user' || msg.role === 'assistant') {
        cleanMessages.push({
          role: msg.role,
          content: String(msg.content || msg.text || '')
        })
      }
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 512,
          messages: [
    { role: 'system', content: SYSTEM_PROMPT },
    ...cleanMessages
  ],
      }),
    })

    const data = await response.json()
    console.log('Groq response:', JSON.stringify(data).substring(0, 200))

    if (data.error) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ reply: 'Sorry, I am having trouble. Please contact chandruwebdesigner@gmail.com 😊' }),
      }
    }

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
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ reply: 'Sorry, something went wrong! Please contact chandruwebdesigner@gmail.com' }),
    }
  }
}