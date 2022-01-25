import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CurrencyAmount, JSBI, Token, Trade } from '@pancakeswap/sdk'
import { RouteComponentProps } from 'react-router-dom'
import { Button, Text, ArrowDownIcon, Box, useModal } from '@pancakeswap/uikit'
import { ArrowWrapper, SwapCallbackError, Wrapper } from './components/styleds'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import Column, { AutoColumn } from '../../components/Layout/Column'
import { AutoRow, RowBetween } from '../../components/Layout/Row'
import { AppHeader, AppBody } from '../../components/App'
import { useTranslation } from 'contexts/Localization'
import SwapWarningTokens from 'config/constants/swapWarningTokens'
import { ApprovalState, useApproveCallbackFromTrade } from '../../hooks/useApproveCallback'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'
import { Field } from '../../state/swap/actions'
import {
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '../../state/swap/hooks'
import { useExpertModeManager, useUserSlippageTolerance } from '../../state/user/hooks'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import Page from '../Page'

export default function Swap({ history }: RouteComponentProps) {
  const { t } = useTranslation()

  // for expert mode
  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()
  
  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade

  const parsedAmounts = showWrap
  ? {
      [Field.INPUT]: parsedAmount,
      [Field.OUTPUT]: parsedAmount,
    }
  : {
      [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
      [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
    }

  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  const shouldShowSwapWarning = (swapCurrency) => {
    const isWarningToken = Object.entries(SwapWarningTokens).find((warningTokenConfig) => {
      const warningTokenData = warningTokenConfig[1]
      return swapCurrency.address === warningTokenData.address
    })
    return Boolean(isWarningToken)
  }

  // swap warning state
  const [swapWarningCurrency, setSwapWarningCurrency] = useState(null)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
      const showSwapWarning = shouldShowSwapWarning(inputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(inputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },
    [onCurrencySelection],
  )

  return (
    <Page>
      <AppBody>
        <AppHeader title={t('Exchange')} subtitle={t('Trade tokens in an instant')} />
        <Wrapper id="swap-page">
          <AutoColumn gap="md">
            <CurrencyInputPanel
                label={independentField === Field.OUTPUT && !showWrap && trade ? t('From (estimated)') : t('From')}
                value={formattedAmounts[Field.INPUT]}
                showMaxButton={!atMaxAmountInput}
                currency={currencies[Field.INPUT]}
                onUserInput={handleTypeInput}
                onMax={handleMaxInput}
                onCurrencySelect={handleInputSelect}
                otherCurrency={currencies[Field.OUTPUT]}
                id="swap-currency-input"
              />
              <AutoColumn justify="space-between">
                <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                  <ArrowWrapper clickable>
                    <ArrowDownIcon
                      width="16px"
                      onClick={() => {
                        setApprovalSubmitted(false) // reset 2 step UI for approvals
                        onSwitchTokens()
                      }}
                      color={currencies[Field.INPUT] && currencies[Field.OUTPUT] ? 'primary' : 'text'}
                    />
                  </ArrowWrapper>
                  {recipient === null && !showWrap && isExpertMode ? (
                    <Button variant="text" id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                      {t('+ Add a send (optional)')}
                    </Button>
                  ) : null}
                </AutoRow>
              </AutoColumn>
            </AutoColumn>
        </Wrapper>
      </AppBody>
    </Page>
  )
}