import { createStore } from "@reduxjs/toolkit"

const ACTION_CHANNELS_APPEND = "channels_append"

const rootState = {
  channels: [],
}

function discord(state = rootState, action) {
  switch (action.type) {
    case ACTION_CHANNELS_APPEND:
      return Object.assign(state, {
        channels: [...state.channels, action.payload],
      })
  }
}

const store = createStore(discord)

export { store }

export const actions = { ACTION_CHANNELS_APPEND: ACTION_CHANNELS_APPEND }
