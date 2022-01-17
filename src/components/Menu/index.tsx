import { Menu as UikitMenu } from 'npm-react-uikit' // '@pancakeswap/uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import config from './config/config'

const Menu = (props) => {
  const { toggleTheme } = useTheme()
  const { currentLanguage, setLanguage, t } = useTranslation()
  return (
    <UikitMenu
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      links={config(t)}
      {...props}
    />
  )
}

export default Menu
