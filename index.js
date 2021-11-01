const path = require('path')
const express = require('express')
const morgan = require('morgan')
const rendertron = require('rendertron-middleware')

const app = express()

app.use(morgan('combined'))
app.set('trust proxy', 1)

const STATIC = path.resolve(__dirname, '/app/frontend')
const INDEX = path.resolve(STATIC, 'index.html')
const port = process.env.HTTP_PORT ? Number(process.env.HTTP_PORT) : 80

// List of UAs I have discovered to be bots that can't handle SPAs
rendertron.botUserAgents.push('google')
rendertron.botUserAgents.push('discord')
rendertron.botUserAgents.push('slurp')
rendertron.botUserAgents.push('DuckDuckBot')
rendertron.botUserAgents.push('matrix')

app.use(rendertron.makeMiddleware({
  proxyUrl: process.env.RENDERTRON_URL
}))
app.use(express.static(STATIC))
app.get('*', function (req, res) {
  res.sendFile(INDEX)
})

app.listen(port)
