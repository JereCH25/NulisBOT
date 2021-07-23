// SCRIPT BOT WA NULIS
const {
	MessageOptions,
    WALocationMessage,
    WA_MESSAGE_STUB_TYPES,
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const setting = JSON.parse(fs.readFileSync('./settings/settings.json'))
prefix = setting.prefix
blocked = []

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)}J ${pad(minutes)}M ${pad(seconds)}D`
}

async function starts() {
	const client = new WAConnection()
	client.version = [2, 2119, 6]
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color('Scan the qr code above'))
	})

	fs.existsSync('./nulis.json') && client.loadAuthInfo('./nulis.json')
	client.on('connecting', () => {
		start('2', 'Connecting...')
	})
	client.on('open', () => {
		success('2', 'Connected')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./nulis.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
            if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
            const tescuk = ["0@s.whatsapp.net"]
			const botNumber = client.user.jid
			const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`] // replace this with your number
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			pushname = client.contacts[sender] != undefined ? client.contacts[sender].vname || client.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const freply = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `Nulis Bot Whatsapp` }}
			
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
const costum = (pesan, tipe, target, target2) => {
client.sendMessage(from, pesan, tipe, {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` }}})
  }
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			let authorname = client.contacts[from] != undefined ? client.contacts[from].vname || client.contacts[from].notify : undefined	
			if (authorname != undefined) { } else { authorname = groupName }	
			
			switch(command) {
				case 'help':
				case 'menu':
	client.sendMessage(from, `
╭─「 *NULIS BOT* 」──
│❒ Nama : ${pushname} 
│❒ Nomer : wa.me/${sender.split("@")[0]}
╰───────────────────

╭─「 *NULIS MENU* 」──
│❒ ${prefix}bukukanan
│❒ ${prefix}bukukiri
│❒ ${prefix}foliokanan
│❒ ${prefix}foliokiri
╰───────────────────

╭─「 *THANKS TO* 」──
│❒ MhankBarBar <Script Ori>
│❒ Arga Bot Wa <Script>
│❒ Jere CH <Pengembang>
│❒ All Rest API
╰─────────────────── `, MessageType.text, {quoted: freply})
					break
               case 'bukukanan':
				if (args.length < 1) return reply(`Example : ${prefix}nulis hello world`)
				ct = body.slice(10)
				buffer = await getBuffer(`http://zekais-api.herokuapp.com/bukukanan?text=${ct}`)
				client.sendMessage(from, buffer, image, {caption: 'Nih, lain kali jangan malas ya kak <_>', quoted: freply})
				break
case 'bukukiri':
				if (args.length < 1) return reply(`Example : ${prefix}nulis hello world`)
				ct = body.slice(9)
				buffer = await getBuffer(`http://zekais-api.herokuapp.com/bukukiri?text=${ct}`)
				client.sendMessage(from, buffer, image, {caption: 'Nih, lain kali jangan malas ya kak <_>', quoted: freply})
				break
case 'foliokanan':
				if (args.length < 1) return reply(`Example : ${prefix}nulis hello world`)
				ct = body.slice(11)
				buffer = await getBuffer(`http://zekais-api.herokuapp.com/foliokanan?text=${ct}`)
				client.sendMessage(from, buffer, image, {caption: 'Nih, lain kali jangan malas ya kak <_>', quoted: freply})
				break
case 'foliokiri':
				if (args.length < 1) return reply(`Example : ${prefix}nulis hello world`)
				ct = body.slice(10)
				buffer = await getBuffer(`http://zekais-api.herokuapp.com/foliokiri?text=${ct}`)
				client.sendMessage(from, buffer, image, {caption: 'Nih, lain kali jangan malas ya kak <_>', quoted: freply})
				break
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
