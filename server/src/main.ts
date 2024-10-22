import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { createServer } from 'http'
import { getConfig, loadConfig } from './config.js'
import { notFoundHandler } from './not-found-handler.js'
import { db } from './prisma.js'
import { routes } from './routes/routes.js'
import { applyRoutes } from './routing.js'
import { initWs } from './ws.js'

const dotenvConfig = dotenv.config()

if (dotenvConfig.error) {
    throw dotenvConfig.error
}

loadConfig(dotenvConfig.parsed!)

await db.$connect()

const app = express()
const server = createServer(app)

app.use(bodyParser.json({ limit: '50mb' }))

if (getConfig().NODE_ENV === 'development') {
    app.use(cors({ origin: '*' }))
}

applyRoutes(app, routes)
app.use(notFoundHandler)

initWs(server)

server.listen(8050, () => {
    console.log('Listening on port 8050')
})
