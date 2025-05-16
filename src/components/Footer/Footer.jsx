import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import CircleTitle from "../CircleTitle/CircleTitle.jsx";
import style from './Footer.module.css';
import logo from '../../assets/svg/logo/slimMomLogo.svg';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className={style.footer}>
      <div className={style.footerContainer}>
        <div className={style.footerLogo}>
          <img src={logo} alt="Slim Mom Logo" className={style.logoImg} />
        </div>

        <div className={style.footerInfo}>
          <p className={style.footerText}>
            Built with love by GO IT{" "}
            <button className={style.modalButton} onClick={() => setIsModalOpen(true)}>
              students
            </button>.
          </p>
        </div>

        <div className={style.footerTitle}>
          <CircleTitle />
        </div>
      </div>

      {isModalOpen && (
        <div className={style.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>GO IT Students</h2>
            <div className={style.studentList}>
              <div className={style.studentCard}>
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Ali Yılmaz" className={style.studentImg} />
                <h3>Ali Yılmaz</h3>
                <div className={style.icons}>
                  <a href="https://github.com/aliyilmaz" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a href="https://linkedin.com/in/aliyilmaz" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </div>
              </div>

              <div className={style.studentCard}>
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Ayla Demir" className={style.studentImg} />
                <h3>Ayla Demir</h3>
                <div className={style.icons}>
                  <a href="https://github.com/aylademir" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a href="https://linkedin.com/in/aylademir" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </div>
              </div>

              <div className={style.studentCard}>
                <img src="https://randomuser.me/api/portraits/men/51.jpg" alt="Mehmet Koç" className={style.studentImg} />
                <h3>Mehmet Koç</h3>
                <div className={style.icons}>
                  <a href="https://github.com/mehmetkoc" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a href="https://linkedin.com/in/mehmetkoc" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </div>
              </div>

              <div className={style.studentCard}>
                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Zeynep Kılıç" className={style.studentImg} />
                <h3>Zeynep Kılıç</h3>
                <div className={style.icons}>
                  <a href="https://github.com/zeynepkilic" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a href="https://linkedin.com/in/zeynepkilic" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </div>
              </div>
              <div className={style.studentCard}>
                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Zeynep Kılıç" className={style.studentImg} />
                <h3>Zeynep Kılıç</h3>
                <div className={style.icons}>
                  <a href="https://github.com/zeynepkilic" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a href="https://linkedin.com/in/zeynepkilic" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </div>
              </div>
            </div>
            <button className={style.closeButton} onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;