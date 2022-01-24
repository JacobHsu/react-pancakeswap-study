import { RouteComponentProps } from 'react-router-dom'
import { Button, Text, ArrowDownIcon, Box, useModal } from '@pancakeswap/uikit'
import { ArrowWrapper, SwapCallbackError, Wrapper } from './components/styleds'
import Column, { AutoColumn } from '../../components/Layout/Column'
import { AutoRow, RowBetween } from '../../components/Layout/Row'
import { AppHeader, AppBody } from '../../components/App'
import { useTranslation } from 'contexts/Localization'
import { Field } from '../../state/swap/actions'
import {
  useDerivedSwapInfo,
} from '../../state/swap/hooks'
import { useExpertModeManager} from '../../state/user/hooks'
import Page from '../Page'

export default function Swap({ history }: RouteComponentProps) {
  const { t } = useTranslation()

  // for expert mode
  const [isExpertMode] = useExpertModeManager()

  // swap state
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()

  return (
    <Page>
      <AppBody>
        <AppHeader title={t('Exchange')} subtitle={t('Trade tokens in an instant')} />
        <Wrapper id="swap-page">
          <AutoColumn gap="md">
            <AutoColumn justify="space-between">
                <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                  <ArrowWrapper clickable>
                    <ArrowDownIcon
                      width="16px"
                      onClick={() => {
                        // setApprovalSubmitted(false) // reset 2 step UI for approvals
                        // onSwitchTokens()
                      }}
                      color={currencies[Field.INPUT] && currencies[Field.OUTPUT] ? 'primary' : 'text'}
                    />
                  </ArrowWrapper>
                  {/* {recipient === null && !showWrap && isExpertMode ? (
                    <Button variant="text" id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                      {t('+ Add a send (optional)')}
                    </Button>
                  ) : null} */}
                </AutoRow>
              </AutoColumn>
          </AutoColumn>
        </Wrapper>
      </AppBody>
    </Page>
  )
}
