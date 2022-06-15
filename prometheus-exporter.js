import express from 'express'
const app = express()
import ValidatorExporter from './validator-exporter.js'

const PORT = 3000

const config ={
	url: 'https://kusama.w3f.community/candidates',
	token: 'KSM',
    // url: 'https://polkadot.w3f.community/candidates',
	// token: 'DOT',
    interval: 10 * 60 * 1000 // 10 * 60 seconds = 10 mins
}

let worker = new ValidatorExporter.ValidatorExporter(config)

app.get('/', (req, res) => {
	res.set("Content-Type","text/plain; version=0.0.4")
        .send('nothing to see here... try /metrics/<stash>')
})

app.get('/metrics/:stash', async (req, res) => {
    console.debug(req.params)
    if (!req.params.stash) {
    res.status(500).json({error: 'did you mean /metrics/<stash>'})
    }
    try {
        let data = await worker.query(req.params.stash)
        res.set("Content-Type","text/plain; version=0.0.4")
        res.send(data)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.listen(PORT, (err) => {
    if (err) console.log("Error in server setup")
    console.log(`Server listening on http://localhost:${PORT}`)
})
