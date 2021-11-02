const path = require('path')
const express = require('express')
const morgan = require('morgan')
const pupperender = require('pupperender')

const app = express()

app.use(morgan('combined'))
app.set('trust proxy', 1)

const STATIC = path.resolve(__dirname, '/app/frontend')
const INDEX = path.resolve(STATIC, 'index.html')
const port = process.env.HTTP_PORT ? Number(process.env.HTTP_PORT) : 80

// List of UAs I have discovered to be bots that can't handle SPAs
pupperender.botUserAgents.push('google')
pupperender.botUserAgents.push('discord')
pupperender.botUserAgents.push('slurp')
pupperender.botUserAgents.push('DuckDuckBot')
pupperender.botUserAgents.push('matrix')

app.use(pupperender.makeMiddleware({}))
app.use(express.static(STATIC))
app.get('*', function (req, res) {
  res.sendFile(INDEX)
})

app.listen(port)
