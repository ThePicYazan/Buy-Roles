const { Client, Events, EmbedBuilder, WebhookClient, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

const ms = require('ms')
const client = new Client({
    intents: 131071,
})
const crypto = require('crypto');
const { buyrole1, buyrole2, buyrole3, buyrole4, buylogs, owner, probot, price1, price2, price3, price4, prefix, time1, time2, time3, time4, webhookurl } = require('./config.json');
const { Dataa } = require('./DataBase/Models/data');
require('./DataBase/connect');

const token = process.env.token

client.on(Events.ClientReady, async () => {
    await console.log(client.user.tag);
    await client.user.setActivity(`Idk`, { type: 'WATCHING' });
}).login(token);

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const webhook = new WebhookClient({ url: `${webhookurl}` });
async function bot() {
    try {
        await client.login(client.token);
        console.log('Bot is working and logged in successfully!');
    } catch (error) {
        console.error('Bot is not working. Error:', error);
        let err = new EmbedBuilder()
            .setTitle("Thailand Codes || Syno Uptime")
            .setURL("https://discord.gg/bRRCkmPDFm")
            .setDescription(`\`\`\`${error}\`\`\``)
            .setColor("#2f3136")
        await webhook.send({ content: `<@!${owner}> You'r Project got Error`, embeds: [err] });
        return process.kill('1');
    }
}
setInterval(async () => {
    bot();
}, 6000);


client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    let role1 = message.guild.roles.cache.get(buyrole1);
    let role2 = message.guild.roles.cache.get(buyrole2);
    let role3 = message.guild.roles.cache.get(buyrole3);
    let role4 = message.guild.roles.cache.get(buyrole4);

    let logs = message.guild.channels.cache.get(buylogs);

    if (command === 'buy') {

        let tax1 = Math.floor(price1 * (20) / (19) + (1))
        let tax2 = Math.floor(price2 * (20) / (19) + (1))
        let tax3 = Math.floor(price3 * (20) / (19) + (1))
        let tax4 = Math.floor(price4 * (20) / (19) + (1))

        const embed = new EmbedBuilder()

        embed.setDescription(`
        > **${role1} | price ${tax1}**
        > **${role2} | price ${tax2}**
        > **${role3} | price ${tax3}**
        > **${role4} | price ${tax4}**
        `)


        const button1 = new ButtonBuilder()
        button1.setCustomId('1')
        button1.setLabel(`Buy ${role1.name}`)
        button1.setStyle(ButtonStyle.Primary)


        const button2 = new ButtonBuilder()

        button2.setCustomId('2')
        button2.setLabel(`Buy ${role2.name}`)
        button2.setStyle(ButtonStyle.Primary)

        const button3 = new ButtonBuilder()

        button3.setCustomId('3')
        button3.setLabel(`Buy ${role3.name}`)
        button3.setStyle(ButtonStyle.Primary)

        const button4 = new ButtonBuilder()

        button4.setCustomId('4')
        button4.setLabel(`Buy ${role4.name}`)
        button4.setStyle(ButtonStyle.Primary)

        const row = new ActionRowBuilder()
        row.addComponents([button1, button2, button3, button4])

        await message.reply({ embeds: [embed], components: [row] });

        const filter = i => i.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

        const invoiceNumber = crypto.randomBytes(8).toString('hex');
        const purchaseDate = new Date().toLocaleString();
        let blacklist = [];
        collector.on('collect', async i => {
            try {
                await i.deferUpdate({ ephemeral: true })
                if (i.customId === '1') {
                    if (blacklist.includes(i.user.id)) {
                        return;
                    }
                    await blacklist.push(i.user.id)
                    let tax = await Math.floor(price1 * (20) / (19) + (1))
                    let time = await message.reply(`\`\`\`/credits user: ${owner} amount: ${tax}\`\`\``)
                    const filter = user => user.author.id === probot && user.content === `**:moneybag: | ${message.author.username}, has transferred \`$${price1}\` to <@!${owner}> **`
                    i.channel.awaitMessages({ filter, max: 1, time: 60_000, errors: ['time'] }).then(async () => {
                        await message.reply({ content: 'Purchase completed successfully for ' + i.user.username });
                        await i.message.delete();
                        await time.delete();
                        await message.member.roles.add(role1);
                        const embed = new EmbedBuilder()
                        embed.setColor('#0099ff')
                        embed.setTitle('Role Added')
                        embed.setDescription(`Role ${role1} has been added to ${message.author} for the next 30 days.\n\n**Invoice number:** ${invoiceNumber}\n**Purchase date:** ${purchaseDate}`)
                        embed.setTimestamp();
                        await logs.send({ embeds: [embed] });
                        await Dataa.create({
                            invoiceNumber: invoiceNumber,
                            server: message.guild.id,
                            id: message.author.id,
                            endsAt: Date.now() + ms(time1),
                            roleid: role1.id,
                        }).then(async () => {
                            const embed = new EmbedBuilder()
                                .setTitle('Role Purchased')
                                .setDescription(`A role has been purchased for 30 days: ${role1.name}`)
                                .addFields(
                                    { name: 'Invoice Number', value: invoiceNumber },
                                    { name: 'Purchase Date', value: purchaseDate }
                                )
                                .setColor('#0099ff')
                                .setFooter({ text: 'Thanks for your purchase!' });
                            message.author.send({ embeds: [embed] });
                        }).catch(er => { return false });
                    }).catch(async (e) => {
                        await blacklist.splice(blacklist.indexOf(i.user.id), 1);
                        return message.reply({ content: `Time's up and you haven't bought anything, ${i.user}.` });

                    });
                }
                if (i.customId === '2') {
                    if (blacklist.includes(i.user.id)) {
                        return;
                    }
                    let tax = Math.floor(price2 * (20) / (19) + (1))
                    let time = await message.reply(`\`\`\`/credits user: ${owner} amount: ${tax}\`\`\``)
                    const filter = user => user.author.id === probot && user.content === `**:moneybag: | ${message.author.username}, has transferred \`$${price2}\` to <@!${owner}> **`
                    i.channel.awaitMessages({ filter, max: 1, time: 60_000, errors: ['time'] }).then(async () => {
                        await message.reply({ content: 'Purchase completed successfully for ' + i.user.username });
                        await i.message.delete();
                        await time.delete();
                        const embed = new EmbedBuilder()
                        embed.setColor('#0099ff')
                        embed.setTitle('Role Added')
                        embed.setDescription(`Role ${role2} has been added to ${message.author} for the next 30 days.\n\n**Invoice number:** ${invoiceNumber}\n**Purchase date:** ${purchaseDate}`)
                        embed.setTimestamp();
                        await logs.send({ embeds: [embed] });
                        await Dataa.create({
                            invoiceNumber: invoiceNumber,
                            server: message.guild.id,
                            id: message.author.id,
                            endsAt: Date.now() + ms(time2),
                            roleid: role2.id,
                        }).then(async () => {
                            const embed = new EmbedBuilder()
                                .setTitle('Role Purchased')
                                .setDescription(`A role has been purchased for 30 days: ${role2.name}`)
                                .addFields(
                                    { name: 'Invoice Number', value: invoiceNumber },
                                    { name: 'Purchase Date', value: purchaseDate }
                                )
                                .setColor('#0099ff')
                                .setFooter({ text: 'Thanks for your purchase!' });
                            message.author.send({ embeds: [embed] });
                        }).catch(er => { return false });
                        return false
                    }).catch(async () => {
                        await blacklist.splice(blacklist.indexOf(i.user.id), 1);
                        return message.reply({ content: `Time's up and you haven't bought anything, ${i.user}.` });

                    });
                }
                if (i.customId === '3') {
                    if (blacklist.includes(i.user.id)) {
                        return;
                    }
                    let tax = Math.floor(price3 * (20) / (19) + (1))
                    let time = await message.reply(`\`\`\`/credits user: ${owner} amount: ${tax}\`\`\``)
                    const filter = user => user.author.id === probot && user.content === `**:moneybag: | ${message.author.username}, has transferred \`$${price3}\` to <@!${owner}> **`
                    i.channel.awaitMessages({ filter, max: 1, time: 60_000, errors: ['time'] }).then(async () => {
                        await message.reply({ content: 'Purchase completed successfully for ' + i.user.username });
                        await i.message.delete();
                        await time.delete();
                        const embed = new EmbedBuilder()
                        embed.setColor('#0099ff')
                        embed.setTitle('Role Added')
                        embed.setDescription(`Role ${role3} has been added to ${message.author} for the next 30 days.\n\n**Invoice number:** ${invoiceNumber}\n**Purchase date:** ${purchaseDate}`)
                        embed.setTimestamp();
                        await logs.send({ embeds: [embed] });
                        await message.member.roles.add(role3);
                        await Dataa.create({
                            invoiceNumber: invoiceNumber,
                            server: message.guild.id,
                            id: message.author.id,
                            endsAt: Date.now() + ms(time3),
                            roleid: role3.id,
                        }).then(async () => {
                            const embed = new EmbedBuilder()
                                .setTitle('Role Purchased')
                                .setDescription(`A role has been purchased for 30 days: ${role3.name}`)
                                .addFields(
                                    { name: 'Invoice Number', value: invoiceNumber },
                                    { name: 'Purchase Date', value: purchaseDate }
                                )
                                .setColor('#0099ff')
                                .setFooter({ text: 'Thanks for your purchase!' });
                            message.author.send({ embeds: [embed] });
                        }).catch(er => { return false });
                        return false
                    }).catch(async () => {
                        await blacklist.splice(blacklist.indexOf(i.user.id), 1);
                        return message.reply({ content: `Time's up and you haven't bought anything, ${i.user}.` });

                    });
                }
                if (i.customId === '4') {
                    if (blacklist.includes(i.user.id)) {
                        return;
                    }
                    let tax = Math.floor(price4 * (20) / (19) + (1))
                    let time = await message.reply(`\`\`\`/credits user: ${owner} amount: ${tax}\`\`\``)
                    const filter = user => user.author.id === probot && user.content === `**:moneybag: | ${message.author.username}, has transferred \`$${price4}\` to <@!${owner}> **`
                    i.channel.awaitMessages({ filter, max: 1, time: 60_000, errors: ['time'] }).then(async () => {
                        await message.reply({ content: 'Purchase completed successfully for ' + i.user.username });
                        await i.message.delete();
                        await time.delete();
                        const embed = new EmbedBuilder()
                        embed.setColor('#0099ff')
                        embed.setTitle('Role Added')
                        embed.setDescription(`Role ${role4} has been added to ${message.author} for the next 30 days.\n\n**Invoice number:** ${invoiceNumber}\n**Purchase date:** ${purchaseDate}`)
                        embed.setTimestamp();
                        await logs.send({ embeds: [embed] });
                        await Dataa.create({
                            invoiceNumber: invoiceNumber,
                            server: message.guild.id,
                            id: message.author.id,
                            endsAt: Date.now() + ms(time4),
                            roleid: role4.id,
                        }).then(async () => {
                            const embed = new EmbedBuilder()
                                .setTitle('Role Purchased')
                                .setDescription(`A role has been purchased for 30 days: ${role4.name}`)
                                .addFields(
                                    { name: 'Invoice Number', value: invoiceNumber },
                                    { name: 'Purchase Date', value: purchaseDate }
                                )
                                .setColor('#0099ff')
                                .setFooter({ text: 'Thanks for your purchase!' });
                            message.author.send({ embeds: [embed] });
                        }).catch(er => { return false });
                        return false
                    }).catch(async () => {
                        await blacklist.splice(blacklist.indexOf(i.user.id), 1);
                        return message.reply({ content: `Time's up and you haven't bought anything, ${i.user}.` });
                    });
                }
            } catch (err) {
                return;
            }
        });
    }
})

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'check') {
        if (message.author.id !== owner) return;
        let msg = args.splice(0).join(" ");
        if (!msg) {
            return message.reply({ content: 'Enter the invoice number to verify the purchase' })
        }
        let data = await Dataa.findOne({ invoiceNumber: msg });
        if (!data) {
            return message.reply({ content: 'Could not find the specified invoice number' });
        }

        let endsAt = parseInt(data.endsAt);
        let currentTime = Date.now();
        let remainingTime = endsAt - currentTime;

        let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        let timeString = "";
        if (days > 0) {
            timeString += `${days} day${days > 1 ? 's' : ''}, `;
        }
        timeString += `${hours} hour${hours > 1 ? 's' : ''}, ${minutes} minute${minutes > 1 ? 's' : ''}, ${seconds} second${seconds > 1 ? 's' : ''}`;

        let embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Invoice Information')
            .addFields(
                { name: 'Invoice Number', value: data.invoiceNumber },
                { name: 'Server ID', value: data.server },
                { name: 'User ID', value: data.id },
                { name: 'Expires at', value: new Date(endsAt).toLocaleString() },
                { name: 'Remaining time', value: timeString }
            );
        message.reply({ embeds: [embed] });
    }
})

async function checkExpiredRoles() {
    try {
        const members = await Dataa.find({});
        for (const member of members) {
            const guild = await client.guilds.fetch(member.server);
            const memberObj = await guild.members.fetch(member.id);
            const role = guild.roles.cache.get(member.roleid);
            if (memberObj.roles.cache.has(role.id)) {
                if (member.endsAt <= new Date()) {
                    await memberObj.roles.remove(role);
                    const embed = new EmbedBuilder()
                        .setColor('#ff0000')
                        .setTitle(`Subscription Expired`)
                        .setDescription(`The subscription for ${memberObj} has expired. Their ${role} role has been removed.`)

                    await client.channels.cache.get(subend).send({ content: `${memberObj}`, embeds: [embed] });
                    await Dataa.findByIdAndDelete(member._id);
                }
            }
        }
    } catch {
        return;
    }
}

setInterval(() => {
    checkExpiredRoles();
}, ms("1m"));

process.on("unhandledRejection", errorr => {
    let err = new EmbedBuilder()
        .setTitle("Thailand Codes || Syno Uptime")
        .setURL("https://discord.gg/bRRCkmPDFm")
        .setDescription(`\`\`\`${errorr}\`\`\``)
    webhook.send({ content: `<@!${owner}>`, embeds: [err] });
});
process.on("rejectionHandled", errorr => {
    let err = new EmbedBuilder()
        .setTitle("Thailand Codes || Syno Uptime")
        .setURL("https://discord.gg/bRRCkmPDFm")
        .setDescription(`\`\`\`${errorr}\`\`\``)
    webhook.send({ content: `<@!${owner}>`, embeds: [err] });
});
process.on("uncaughtException", errorr => {
    let err = new EmbedBuilder()
        .setTitle("Thailand Codes || Syno Uptime")
        .setURL("https://discord.gg/bRRCkmPDFm")
        .setDescription(`\`\`\`${errorr}\`\`\``)
    webhook.send({ content: `<@!${owner}>`, embeds: [err] });
});