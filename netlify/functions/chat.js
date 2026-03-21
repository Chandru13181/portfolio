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
1. UI/UX Design - Complete interface design
2. Web Design - Responsive modern websites
3. Mobile App Design - iOS & Android
4. Branding - Logo and brand identity
5. Prototyping - Interactive Figma prototypes
6. Frontend Development - React based development

CONTACT:
- Email: chandruwebdesigner@gmail.com
- Phone: +91 93611 98301
- Available for freelance, full-time roles and creative collaborations
- Response time: Within 24 hours

Be professional, friendly and helpful. Keep responses concise (2-3 paragraphs). Use occasional emojis.`

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

    // Groq does NOT support system role
    // Use user/assistant pair to inject context
    const messages = [
      {
        role: 'user',
        content: SYSTEM_PROMPT + '\n\nPlease confirm you understand your role as Chandru\'s AI assistant.'
      },
      {
        role: 'assistant',
        content: 'I understand! I am Chandru\'s AI assistant, ready to help visitors learn about his work, skills, services, and how to collaborate with him. How can I help you today? 😊'
      },
      ...userMessages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: String(m.content || m.text || '')
      }))
    ]

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 512,
        temperature: 0.7,
        messages: messages,
      }),
    })

    const data = await response.json()
    console.log('Groq response status:', data.error ? 'ERROR' : 'OK')

    if (data.error) {
      console.log('Groq error:', data.error.message)
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          reply: 'Sorry, I am having trouble right now. Please contact Chandru directly at chandruwebdesigner@gmail.com 😊'
        }),
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
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        reply: 'Sorry, something went wrong! Please contact chandruwebdesigner@gmail.com'
      }),
    }
  }
}