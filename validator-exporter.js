/**
 * Data provider for prometheus-exporter
 * keeps track of:
 *  - active
 *  - score:
 */
import axios from 'axios'
import moment from 'moment-timezone'

const DEFAULT_TOKEN = 'KSM'
const PREFIX = `${DEFAULT_TOKEN.toLocaleLowerCase()}_1kv`
const DEFAULT_URL = 'https://kusama.w3f.community/candidates'
const DEFAULT_INTERVAL = 3600 // seconds = 1 hour

const DEFAULT_CONFIG = {
    token: DEFAULT_TOKEN,
    prefix: PREFIX,
    url: DEFAULT_URL,
    interval: DEFAULT_INTERVAL,
    dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    trace: true
}

// const exampleResponse = {
//     "discoveredAt":1644239915715,
//     "nominatedAt":1655275516399,
//     "offlineSince":0,
//     "offlineAccumulated":0,
//     "rank":55,
//     "faults":5,
//     "invalidityReasons":"",
//     "unclaimedEras":[],
//     "inclusion":0.3333333333333333,
//     "name":"E-KAT",
//     "stash":"DzF1mzay4Nm1vepKtMWAAMaxZeovTjCZEzBLEx6J7Bnf4bd",
//     "kusamaStash":"",
//     "commission":10,
//     "identity":{"name":"EKAT","verified":true,"_id":"62a992c7c58906b15dd2e8aa"},
//     "active":false,
//     "valid":true,
//     "validity":[
//         {"valid":true,"type":"CLIENT_UPGRADE","details":"","updated":1655278035141,"_id":"62a989d3c58906b15dcb3e10"},
//         {"valid":true,"type":"COMMISION","details":"","updated":1655278035185,"_id":"62a989d3c58906b15dcb3e47"},
//         {"valid":true,"type":"IDENTITY","details":"","updated":1655279242302,"_id":"62a98e8ac58906b15dcf8a7c"},
//         {"valid":true,"type":"ONLINE","details":"","updated":1655280558158,"_id":"62a993aec58906b15dd3dd2c"},
//         {"valid":true,"type":"VALIDATE_INTENTION","details":"","updated":1655280558761,"_id":"62a993aec58906b15dd3dd3f"},
//         {"valid":true,"type":"CONNECTION_TIME","details":"","updated":1655280558774,"_id":"62a993aec58906b15dd3dd4c"},
//         {"valid":true,"type":"ACCUMULATED_OFFLINE_TIME","details":"","updated":1655280558852,"_id":"62a993aec58906b15dd3dd82"},
//         {"valid":true,"type":"SELF_STAKE","details":"","updated":1655280558938,"_id":"62a993aec58906b15dd3dd91"},
//         {"valid":true,"type":"UNCLAIMED_REWARDS","details":"","updated":1655280558970,"_id":"62a993aec58906b15dd3dd9f"},
//         {"valid":true,"type":"BLOCKED","details":"","updated":1655280559052,"_id":"62a993afc58906b15dd3ddad"}
//     ],
//     "score":{
//         "_id":"620a59aafe937eb3a8084db5",
//         "updated":1655280640361,
//         "address":"DzF1mzay4Nm1vepKtMWAAMaxZeovTjCZEzBLEx6J7Bnf4bd",
//         "total":424.97380601076947,
//         "aggregate":386.2102637024609,
//         "spanInclusion":100,
//         "inclusion":57.14285714285715,
//         "discovered":0.6171999992839949,
//         "nominated":0.036859588953073175,
//         "rank":0.6648005598320503,
//         "unclaimed":0,
//         "bonded":49.132359718386624,
//         "faults":1.7105263157894834,
//         "offline":2,
//         "location":40,
//         "councilStake":50,
//         "democracy":84.90566037735849,
//         "randomness":1.1003690112652529,
//         "__v":0
//     },
//     "total":424.97380601076947,
//     "location":"Calw",
//     "councilStake":"90.3","councilVotes":["DbF59HrqrrPh9L2Fi4EBd7gn4xFUSXmrE6zyMzf3pETXLvg","JKoSyjg9nvVZterFB5XssM7eaYj4Ty6LhCLRGUfy6NKGNC3","DMF8a34emwapz9mV5P5PTDcghh1ZR3miH9ad9mHzfAUMSXU"],"democracyVoteCount":34,"democracyVotes":[174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207]
// }

class ValidatorExporter {

    data = []
    updatedAt = undefined

	constructor (config = {}) {
        this.slog('ValidExporter()', config)
        this.config = { ...DEFAULT_CONFIG, ...config }
        console.debug(this.config)
        this.update()
        setInterval(() => {
            this.update()
        }, this.config.interval)
	}

	slog (text) {
		if(this.config && this.config.trace) {
			var ts = moment().format(this.config.dateTimeFormat);
			console.log(ts+`|${PREFIX}|`+text);
		}
	}

    async update () {
        this.slog('ValidatorExporter: update()')
        try {
            const res = await axios.get(this.config.url)
            if (res.data) {
                this.data = res.data
                this.updatedAt = moment()
                this.slog(`updated, ${this.data.length} validators`)
            } else {
                this.slog('No data')
                console.debug(res)
            }
        } catch (err) {
            console.debug('Caught AXIOS ERROR')
            console.error(err)
        }
    }

	async query (stash) {
        this.slog(`query() stash: ${stash}`)
        if (!stash) {
            return new Promise((resolve, reject) => {
                reject({
                    error: 'stash is required'
                })
            })
        } else {
            const validator = this.data.find(f => f.stash === stash)
            if (!validator) {
                return new Promise((resolve, reject) => {
                    reject({
                        error: 'invalid stash, is this a valid 1kv validator?'
                    })
                })
            } else {
                return new Promise((resolve, reject) => {
                    var items = []
                    try {
                        items.push(`${this.config.prefix}_updated_at{stash="${stash}"} ${this.updatedAt.valueOf()}`)
                        items.push(`${this.config.prefix}_valid{stash="${stash}"} ${validator.valid ? 1 : 0}`)
                        items.push(`${this.config.prefix}_active{stash="${stash}"} ${validator.active ? 1 : 0}`)
                        validator.validity.forEach(v => {
                            items.push(`${this.config.prefix}_validity{stash="${stash}", type="${v.type}"} ${v.valid ? 1 : 0}`)
                        })
                        Object.keys(validator.score).forEach(k => {
                            // this.slog(`checking key ${k}`)
                            if (!['_id', 'address', 'stash', '__v'].includes(k)) {
                                items.push(`${this.config.prefix}_score_${k}{stash="${stash}"} ${validator.score[k]}`)
                            }
                        })
                        resolve(items.join("\n"))
                    } catch (err) {
                        reject(err)
                    }
                })
            }
        }
	}
}

export default { ValidatorExporter }
