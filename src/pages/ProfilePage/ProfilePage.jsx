import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSelectors.js";
import { useTranslation } from 'react-i18next';
import style from "./ProfilePage.module.css";

const ProfilePage = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  const getBloodTypeDisplay = (bloodType) => {
    if (!bloodType) return t('profile.notSet');
    return t(`bloodTypes.${bloodType}`);
  };

  return (
    <div className={style.profilePageContainer}>
      <div className={style.profilePage}>
        <div className={style.profileContent}>
          <h1 className={style.welcomeTitle}>
            {t('profile.welcome')} {user?.name || user?.username || "User"}
          </h1>
          
          <div className={style.profileForm}>
            <div className={style.infoGrid}>
              <div className={style.leftColumn}>
                <div className={style.infoDisplay}>
                  <span className={style.infoLabel}>{t('profile.email')}</span>
                  <span className={style.infoValue}>{user?.email || ""}</span>
                </div>
                
                {user?.infouser && (
                  <>
                    <div className={style.infoDisplay}>
                      <span className={style.infoLabel}>{t('profile.height')}</span>
                      <span className={style.infoValue}>
                        {user.infouser.height ? `${user.infouser.height} ${t('profile.cm')}` : t('profile.notSet')}
                      </span>
                    </div>
                    
                    <div className={style.infoDisplay}>
                      <span className={style.infoLabel}>{t('profile.age')}</span>
                      <span className={style.infoValue}>
                        {user.infouser.age ? `${user.infouser.age} ${t('profile.years')}` : t('profile.notSet')}
                      </span>
                    </div>
                    
                    <div className={style.infoDisplay}>
                      <span className={style.infoLabel}>{t('profile.currentWeight')}</span>
                      <span className={style.infoValue}>
                        {user.infouser.currentWeight ? `${user.infouser.currentWeight} ${t('profile.kg')}` : t('profile.notSet')}
                      </span>
                    </div>
                  </>
                )}
              </div>
              
              <div className={style.rightColumn}>
                {user?.infouser && (
                  <>
                    <div className={style.infoDisplay}>
                      <span className={style.infoLabel}>{t('profile.desiredWeight')}</span>
                      <span className={style.infoValue}>
                        {user.infouser.desireWeight ? `${user.infouser.desireWeight} ${t('profile.kg')}` : t('profile.notSet')}
                      </span>
                    </div>
                    
                    <div className={style.infoDisplay}>
                      <span className={style.infoLabel}>{t('profile.bloodType')}</span>
                      <span className={style.infoValue}>
                        {getBloodTypeDisplay(user.infouser.bloodType)}
                      </span>
                    </div>
                    
                    <div className={style.infoDisplay}>
                      <span className={style.infoLabel}>{t('profile.dailyCalorieRate')}</span>
                      <span className={style.infoValue}>
                        {user.infouser.dailyRate ? `${user.infouser.dailyRate} ${t('profile.kcal')}` : t('profile.notCalculated')}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 