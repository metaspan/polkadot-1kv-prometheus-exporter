/**
 * Data provider for prometheus-exporter
 * keeps track of:
 *  - active
 *  - score:
 */
import axios from 'axios'
import moment from 'moment-timezone'

const DEFAULT_TOKEN = 'DOT'
const PREFIX = `${DEFAULT_TOKEN.toLocaleLowerCase()}_1kv`
const DEFAULT_URL = 'https://polkadot.w3f.community/candidates'
const DEFAULT_INTERVAL = 3600 // seconds = 1 hour

const DEFAULT_CONFIG = {
  token: DEFAULT_TOKEN,
  prefix: PREFIX,
  url: DEFAULT_URL,
  interval: DEFAULT_INTERVAL,
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
  trace: true
}

// const example = {
//     "discoveredAt":1623857863032,
//     "nominatedAt":1655292612690,
//     "offlineSince":0,
//     "offlineAccumulated":0,
//     "rank":53,
//     "faults":0,
//     "invalidityReasons":"",
//     "unclaimedEras":[],
//     "inclusion":0.13095238095238096,
//     "name":"michalis",
//     "stash":"1jA1Eh3j8RmB4dR9BRPRexEUasu22DEbFCakGHo6VaqjdD8",
//     "kusamaStash":"FZyFBAqs93TenupzDHJzW1pxFLxwwo1EJLvT89jhrV368yb",
//     "commission":3,
//     "identity":{"name":"michalis","sub":"abundance","verified":true,"_id":"62a9d469dd4e1fae856d60be"},
//     "active":false,
//     "valid":true,
//     "validity":[
//         {"valid":true,"type":"CLIENT_UPGRADE","details":"","updated":1655286084186,"_id":"62a9a944e0b81d92cd0886e9"},
//         {"valid":true,"type":"VALIDATE_INTENTION","details":"","updated":1655292981815,"_id":"62a9c4356a405bfb3650a6d1"},
//         {"valid":true,"type":"ACCUMULATED_OFFLINE_TIME","details":"","updated":1655293872847,"_id":"62a9c7b06a405bfb36517012"},
//         {"valid":true,"type":"ONLINE","details":"","updated":1655296883716,"_id":"62a9d373dd4e1fae856d0acf"},
//         {"valid":true,"type":"CONNECTION_TIME","details":"","updated":1655296883883,"_id":"62a9d373dd4e1fae856d0aef"},
//         {"valid":true,"type":"IDENTITY","details":"","updated":1655296883964,"_id":"62a9d373dd4e1fae856d0b0f"},
//         {"valid":true,"type":"REWARD_DESTINATION","details":"","updated":1655296883986,"_id":"62a9d373dd4e1fae856d0b20"},
//         {"valid":true,"type":"COMMISION","details":"","updated":1655296884034,"_id":"62a9d374dd4e1fae856d0b30"},
//         {"valid":true,"type":"SELF_STAKE","details":"","updated":1655296884078,"_id":"62a9d374dd4e1fae856d0b40"},
//         {"valid":true,"type":"UNCLAIMED_REWARDS","details":"","updated":1655296884109,"_id":"62a9d374dd4e1fae856d0b50"},
//         {"valid":true,"type":"BLOCKED","details":"","updated":1655296884137,"_id":"62a9d374dd4e1fae856d0b60"},
//         {"valid":true,"type":"KUSAMA_RANK","details":"","updated":1655296884168,"_id":"62a9d374dd4e1fae856d0b70"}
//     ],
//     "score":{
//         "_id":"615ab6dc418add00122d4018",
//         "address":"1jA1Eh3j8RmB4dR9BRPRexEUasu22DEbFCakGHo6VaqjdD8",
//         "updated":1655297705742,
//         "total":407.3997412225055,
//         "aggregate":355.3523044508179,
//         "inclusion":25,
//         "spanInclusion":100,
//         "discovered":2.737728325165917,
//         "nominated":0,
//         "rank":1.577761081893313,
//         "unclaimed":0,
//         "bonded":29.03681504375866,
//         "faults":5,"offline":2,
//         "randomness":1.1464671429445905,"__v":0,
//         "location":40,
//         "councilStake":50,
//         "democracy":100
//     },
//     "total":407.3997412225055,
//     "location":"Lille",
//     "councilStake":"6227.4490967828","councilVotes":["1hCMdtRsaRA4ZTEKpPKPvEjK9rZpGhyFnRHSDhqFMCEayRL","1363HWTPzDrzAQ6ChFiMU6mP4b6jmQid2ae55JQcKtZnpLGv","12NLgzqfhuJkc9mZ5XUTTG85N8yhhzfptwqF1xVhtK3ZX7f6","13RDY9nrJpyTDBSUdBw12dGwhk19sGwsrVZ2bxkzYHBSagP2","12hAtDZJGt4of3m2GqZcUCVAjZPALfvPwvtUTFZPQUbdX1Ud","14DQEq1XtPvntMyUFbgcDCSce79s1CBum3rBYrEeB66qgTqG","128qRiVjxU3TuT37tg7AX99zwqfPtj2t4nDKUv9Dvi5wzxuF","1rwgen2jqJNNg7DpUA4jBvMjyepgiFKLLm3Bwt8pKQYP8Xf"],"democracyVoteCount":16,
//     "democracyVotes":[50,51,53,54,55,56,57,58,59,60,61,62,63,64,65,66]
// }

class ValidatorExporter {

  data = []
  updatedAt = undefined

  constructor (config = {}) {
    this.slog('ValidExporter.constructor()')
    console.debug(config)
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
        this.data = res.data.candidates ? res.data.candidates : res.data
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

  // cross-check valid with validity
  checkValid (valid, validity) {
    return valid
      ? valid
      : validity.filter(f => f.valid === false).length === 0
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
            items.push(`${this.config.prefix}_rank{stash="${stash}"} ${validator.rank}`)
            items.push(`${this.config.prefix}_active{stash="${stash}"} ${validator.active ? 1 : 0}`)
            items.push(`${this.config.prefix}_valid{stash="${stash}"} ${this.checkValid(validator.valid, validator.validity) ? 1 : 0}`)
            validator.validity.forEach(v => {
               items.push(`${this.config.prefix}_validity{stash="${stash}", type="${v.type}"} ${v.valid ? 1 : 0}`)
            })
            Object.keys(validator.score).forEach(k => {
              // this.slog(`checking key ${k}`)
              if (!['_id', 'address', 'stash', '__v'].includes(k)) {
                items.push(`${this.config.prefix}_score{category="${k}", stash="${stash}"} ${validator.score[k]}`)
              }
            })
            // this.slog(`${validator.stash}: score.location: ${validator.score.location}`)
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
