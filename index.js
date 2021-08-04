const path = require('path')
const express = require('express')
const rendertron = require('rendertron-middleware')

const app = express()

const STATIC = path.resolve(__dirname, '/app/frontend')
const INDEX = path.resolve(STATIC, 'index.html')
const port = process.env.HTTP_PORT ? Number(process.env.HTTP_PORT) : 80

rendertron.botUserAgents.push('google')
rendertron.botUserAgents.push('discord')
rendertron.botUserAgents.push('slurp')
rendertron.botUserAgents.push('DuckDuckBot')

app.use(rendertron.makeMiddleware({
  proxyUrl: process.env.RENDERTRON_URL
}))
app.use(express.static(STATIC))
app.get('*', function (req, res) {
  res.sendFile(INDEX)
})

app.listen(port)
