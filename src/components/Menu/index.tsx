import { useLocation } from 'react-router'
import { Menu as UikitMenu } from  'npm-react-uikit' // '@pancakeswap/uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import config from './config/config'
import GlobalSettings from './GlobalSettings'
import { getActiveMenuItem } from './utils'

const Menu = (props) => {
  const { isDark, toggleTheme } = useTheme()

  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useLocation()
  const activeMenuItem = getActiveMenuItem({ menuConfig: config(t), pathname })

  return (
    <UikitMenu
      globalMenu={<GlobalSettings />}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      links={config(t)}
      activeItem={activeMenuItem?.href}
      {...props}
    />
  )
}

export default Menu
