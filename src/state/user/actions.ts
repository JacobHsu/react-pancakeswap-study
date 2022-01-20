import { createAction } from '@reduxjs/toolkit'

export const toggleTheme = createAction<void>('user/toggleTheme')
export const updateUserExpertMode = createAction<{ userExpertMode: boolean }>('user/updateUserExpertMode')
