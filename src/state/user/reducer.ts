import { createReducer } from '@reduxjs/toolkit'
import { SerializedToken } from 'config/constants/types'
import { INITIAL_ALLOWED_SLIPPAGE } from '../../config/constants'
import {
  addSerializedToken,
  updateUserExpertMode,
  toggleTheme,
  updateGasPrice,
  updateUserSingleHopOnly,
} from './actions'
import { GAS_PRICE_GWEI } from './hooks/helpers'

export interface UserState {
  // only allow swaps on direct pairs
  userSingleHopOnly: boolean

  // user defined slippage tolerance in bips, used in all txns
  userSlippageTolerance: number

  tokens: {
    [chainId: number]: {
      [address: string]: SerializedToken
    }
  }
  userExpertMode: boolean
  isDark: boolean
  gasPrice: string
}

export const initialState: UserState = {
  userSlippageTolerance: INITIAL_ALLOWED_SLIPPAGE,
  userSingleHopOnly: false,
  userExpertMode: false,
  isDark: false,
  tokens: {},
  gasPrice: GAS_PRICE_GWEI.default,
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
    .addCase(addSerializedToken, (state, { payload: { serializedToken } }) => {
      if (!state.tokens) {
        state.tokens = {}
      }
      state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {}
      state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken
      //state.timestamp = currentTimestamp()
    })
    .addCase(updateUserSingleHopOnly, (state, action) => {
      state.userSingleHopOnly = action.payload.userSingleHopOnly
    })
    .addCase(updateGasPrice, (state, action) => {
      state.gasPrice = action.payload.gasPrice
    })
)
