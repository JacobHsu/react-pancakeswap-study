import { RouteComponentProps } from 'react-router-dom'
import { ArrowWrapper, SwapCallbackError, Wrapper } from './components/styleds'
import Column, { AutoColumn } from '../../components/Layout/Column'

import { AppHeader, AppBody } from '../../components/App'
import { useTranslation } from 'contexts/Localization'
import Page from '../Page'

export default function Swap({ history }: RouteComponentProps) {
  const { t } = useTranslation()

  return (
    <Page>
      <AppBody>
        <AppHeader title={t('Exchange')} subtitle={t('Trade tokens in an instant')} />
        <Wrapper id="swap-page">
          <AutoColumn gap="md">
          </AutoColumn>
        </Wrapper>
      </AppBody>
    </Page>
  )
}
