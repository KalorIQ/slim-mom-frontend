import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import CircleTitle from "../CircleTitle/CircleTitle.jsx";
import style from './Footer.module.css';
import logo from '../../assets/svg/logo/slimMomLogo.svg';
import { motion } from "framer-motion";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [index, setIndex] = useState(0);


  useEffect(() => {
  const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
  }, 2000); 

  return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const texts = [
      "Students",
      "Developers", 
      "Programmers",
      "Creators",
      "Innovators",
      "Thinkers",
      "Dreamers",
      "Builders",
  ];
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