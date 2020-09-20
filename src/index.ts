// Get env variables.
import * as dotenv from "dotenv"
dotenv.config()

// Instantiate Discord client
import { Client, Message } from "discord.js"
const client = new Client()

// Immutable store
import { store, actions } from "./store"

function sendMessageToDev() {
  const devChannel =
    store.getState().channels.find((c) => c.name === "dev").id || null

  if (devChannel === null) {
    console.error("Channel 'dev' not found.")
  }
}

client.on("ready", () => {
  console.log(`Client is ready, connected as ${client.user.tag}.`)
  console.log(client.channels)
  store.dispatch({
    type: actions.ACTION_CHANNELS_APPEND,
    payload: client.channels,
  })
})

client.on("message", (msg: Message) => {
  console.log("Client received message...", msg.toJSON)
})

client
  .login(process.env["DISCORD_APP_CLIENT_TOKEN"])
  .then(() => console.log("Logged in."))
  .catch((reason: any) => console.log(`Login failed. ${reason}`))
