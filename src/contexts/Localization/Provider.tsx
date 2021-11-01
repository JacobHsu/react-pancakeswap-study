import React, { createContext, useState } from 'react'
import { EN } from 'config/localization/languages'
import { ContextApi, ProviderState } from './types'

const initialState: ProviderState = {
  isFetching: true,
  currentLanguage: EN,
}

export const LanguageContext = createContext<ContextApi>(undefined)

export const LanguageProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<ProviderState>(() => {
    // const codeFromStorage = getLanguageCodeFromLS()

    return {
      ...initialState,
      // currentLanguage: languages[codeFromStorage],
    }
  })
  // const { currentLanguage } = state
  return <LanguageContext.Provider value={{ ...state }}>{children}</LanguageContext.Provider>
}
