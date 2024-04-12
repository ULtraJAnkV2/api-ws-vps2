//console.log('Hola, mundo de nuevo')
import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from "@bot-whatsapp/bot"
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys"

//require ('dotenv').config()

const flowBienvenida  = addKeyword ('Hola').addAnswer('Saludos, desde Bot')

const main = async () => {
    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http?.server.post('/send-message', handleCtx(async(bot,req,res) => {
        const body = req.body
        const phone = body.phone
        const message = body.message
        const mediaUrl = body.mediaUrl
        await bot.sendMessage(phone, message, { 
            media: mediaUrl
        })
        res.end()
    }))
    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })
}

main ()