import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import CircleTitle from "../CircleTitle/CircleTitle.jsx";
import style from './Footer.module.css';
import logo from '../../assets/svg/logo/slimMomLogo.svg';
import mobileLogo from '../../assets/svg/logo/slimMomLogoMobile.svg';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import atilla from "../../assets/image/members/atilla.jpg";
import ferhat from "../../assets/image/members/ferhat.jpg";
import samet from "../../assets/image/members/samet.jpg";
import gokhan from "../../assets/image/members/gokhan.jpg";
import vahide from "../../assets/image/members/segah.jpeg";
import sebnem from "../../assets/image/members/sebnem.jpeg";


const Footer = () => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [index, setIndex] = useState(0);

  // Get animated words from translations
  const texts = t('footer.animatedWords', { returnObjects: true });

  useEffect(() => {
  const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
  }, 2000); 

  return () => clearInterval(interval);
  }, [texts.length]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05, // harfler arası gecikme
      },
    },
  };
  
  const charVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12 } },
  };
  

  return (
    <footer className={style.footer}>
      <div className={style.footerContainer}>
        <div className={style.footerLogo}>
          <img src={logo} alt="Slim Mom Logo" className={style.logoDesktop} />
          <img src={mobileLogo} alt="Slim Mom Mobile Logo" className={style.logoMobile} />
        </div>

        <div className={style.footerInfo}>
          <p className={style.footerText}>
            {i18n.language === 'en' ? (
              <>
                {t('footer.builtWithLove')}{" "}
                <button className={style.modalButton} onClick={() => setIsModalOpen(true)}>
                  {t('footer.students')}
                </button>.
              </>
            ) : i18n.language === 'tr' ? (
              <>
                {t('footer.builtWithLove')}{" "}
                <button className={style.modalButton} onClick={() => setIsModalOpen(true)}>
                  {t('footer.students')}
                </button>{" "}
                {t('footer.byStudents')}.
              </>
            ) : (
              <>
                {t('footer.builtWithLove')}{" "}
                <button className={style.modalButton} onClick={() => setIsModalOpen(true)}>
                  {t('footer.students')}
                </button>.
              </>
            )}
          </p>
        </div>

        <div className={style.footerTitle}>
          <CircleTitle />
        </div>
      </div>

      {isModalOpen && (
        <div className={style.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>GO IT
            <motion.span
                key={index}
                className={style.textWrapper}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={containerVariants}
                >
                {texts[index].split("").map((char, i) => (
                  <motion.span key={i} className={style.char} variants={charVariants}>
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
            </h2>
            <div className={style.studentList}>
              <div className={style.studentCard}>
                <img src={gokhan} alt="Gökhan Karaduman" className={style.studentImg} />
                <h3>Gökhan Karaduman</h3>
                <div className={style.icons}>
                  <a href="https://github.com/gokhankkaraduman" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a href="https://www.linkedin.com/in/gökhan-karaduman-419198320/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </div>
              </div>

              <div className={style.studentCard}>
                <img src={atilla} alt="Atilla Göğüslü" className={style.studentImg} />
                <h3>Atilla Göğüslü</h3>
                <div className={style.icons}>
                  <a href="https://github.com/atillagoguslu" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a href="https://www.linkedin.com/in/atillagoguslu/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </div>
              </div>

              <div className={style.studentCard}>
                <img src={samet} alt="Samet Alptekin Eroğlu" className={style.studentImg} />
                <h3>Samet Alptekin Eroğlu</h3>
                <div className={style.icons}>
                  <a href="https://github.com/salptkin" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a href="https://www.linkedin.com/in/salptekineroglu/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </div>
              </div>

              <div className={style.studentCard}>
                <img src={vahide} alt="Vahide Segah Üney" className={style.studentImg} />
                <h3>Vahide Segah Üney</h3>
                <div className={style.icons}>
                  <a href="https://github.com/vahidesegah" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a href="https://www.linkedin.com/in/vahidesegahuney/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </div>
              </div>
              <div className={style.studentCard}>
                <img src={sebnem} alt="Şebnem Çetin" className={style.studentImg} />
                <h3>Şebnem Çetin</h3>
                <div className={style.icons}>
                  <a href="https://github.com/Shabb007" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a href="https://www.linkedin.com/in/sebnem-cetin-24b5a235/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </div>
              </div>
              <div className={style.studentCard}>
                <img src={ferhat} alt="Ferhat İpek" className={style.studentImg} />
                <h3>Ferhat İpek</h3>
                <div className={style.icons}>
                  <a href="https://github.com/ferhatipek" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </div>
              </div>
            </div>
            <button className={style.closeButton} onClick={() => setIsModalOpen(false)}>
              {t('footer.close')}
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;