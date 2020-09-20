// Get env variables.
import * as dotenv from "dotenv"
dotenv.config()

// Instantiate Discord client
import {
  Client,
  Message,
  Channel,
  ChannelManager,
  PresenceResolvable,
  Presence,
} from "discord.js"
const client = new Client()

client.on("ready", () => {
  client.user.setActivity(`Finns du bland oss?`)

  console.log(`Client is ready, connected as ${client.user.tag}.`)
})

client.on("message", (msg: Message) => {
  console.log("Client received message...", msg, msg.guild.presences)

  if (msg.author.bot === false) {
    if (msg.guild && msg.guild.presences) {
      const presences = msg.guild.presences
        .valueOf()
        .find((p) => p.userID === msg.author.id)

      if (presences) {
        const activityAmongUs = presences.activities.find(
          (a) => process.env["DISCORD_BOT_GAME_NAME"]
        )

        if (activityAmongUs) {
          msg.channel.send(
            `${msg.author.username} spelar ${activityAmongUs.name}.`
          )
        }
      } else {
        console.log(`Found no presences.`)
      }
    }
  }

  // const storedChannel: Channel = store
  //   .getState()
  //   .channels.find((c) => c.id === msg.channel.id)

  // if (msg.channel === storedChannel.id) {
  //   if (msg.cleanContent.toLowerCase() === "är du bland oss") {
  //     msg.channel.send(`Jag är bland er.`)
  //   }
  // }

  if (msg.channel.toJSON()["name"] === "dev") {
    if (msg.author.bot === false) {
      console.log("Channel is dev")

      if (msg.cleanContent.toLowerCase() === "är boten här?") {
        msg.channel.send("Aa.")
      }
    }
  }
})

client
  .login(process.env["DISCORD_APP_CLIENT_TOKEN"])
  .then(() => console.log("Logged in."))
  .catch((reason: any) => console.log(`Login failed. ${reason}`))
