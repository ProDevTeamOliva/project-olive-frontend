import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'
function NoPermission() {
  const { t } = useTranslation()
  return (
    <div className="noPermission">
      <p>{t('NoAccess')}</p>
      <Link to="/login">{t('logIn')}</Link>
    </div>
  );
}

export default NoPermission;
