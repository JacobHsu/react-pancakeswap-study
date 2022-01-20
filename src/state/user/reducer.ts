import { createReducer } from '@reduxjs/toolkit'
import {
  updateUserExpertMode,
  toggleTheme,
} from './actions'

export interface UserState {
  userExpertMode: boolean
  isDark: boolean
}

export const initialState: UserState = {
  userExpertMode: false,
  isDark: false,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(toggleTheme, (state) => {
      state.isDark = !state.isDark
    })
    .addCase(updateUserExpertMode, (state, action) => {
      state.userExpertMode = action.payload.userExpertMode
      // state.timestamp = currentTimestamp()
    })
)
