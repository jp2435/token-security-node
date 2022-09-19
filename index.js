require('dotenv').config()
const crypto = require('node:crypto')
const jwt = require('jsonwebtoken')
const {TOKEN_SECRET, HASH_SECRET} = process.env

function generateToken(params = {}){
    return jwt.sign(params, TOKEN_SECRET, {
        expiresIn: '20h'
    })

}

let tokenUsed
let hashUsed

async function GetStarted(){
    try{
        const data = {
            user: 'jp2435',
            email: 'jp2435@test.git',
            tier: 0,
            admin: false
        }
        const token = generateToken(data)
        

        const signature = crypto.createHmac('sha256', HASH_SECRET)
                            .update(Buffer.from(token, 'utf-8'))
                            .digest('hex')

        console.log(`Token: ${token}\n`)
        console.log(`Hmac: ${signature}`)
    }catch(err){
        console.log(err)
    }
}


async function Compare(token, Hmac){
    try{
        const signature = crypto.createHmac('sha256', HASH_SECRET)
                            .update(Buffer.from(token, 'utf-8'))
                            .digest('hex')

        if(signature == Hmac){
            console.log('OKay')
        }else{
            console.log('Alteração de token')
        }
    }catch(err){
        console.log(err)
    }
}

Compare(tokenUsed, hashUsed)

