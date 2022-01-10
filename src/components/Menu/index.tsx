import { Menu as UikitMenu } from 'npm-react-uikit' // '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import config from './config/config'

const Menu = (props) => {
  const { t } = useTranslation()
  return (
    <UikitMenu
      links={config(t)}
      {...props}
    />
  )
}

export default Menu
