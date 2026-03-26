import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'PowerML API' })
})

// Placeholder routes (to be implemented)
app.get('/api/users/:id',       (req, res) => res.json({ message: 'TODO: get user' }))
app.get('/api/users/:id/goals', (req, res) => res.json({ message: 'TODO: get goals' }))
app.put('/api/users/:id/goals', (req, res) => res.json({ message: 'TODO: update goals' }))
app.get('/api/users/:id/program',(req, res) => res.json({ message: 'TODO: get program' }))

app.listen(PORT, () => {
  console.log(`PowerML API running on http://localhost:${PORT}`)
})
