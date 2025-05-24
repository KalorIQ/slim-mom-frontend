import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import style from "./Flowing.module.css";
import FlowingMenu from './FlowingMenu';
import food from '../../assets/image/healthyfood.jpg';
import fit from '../../assets/image/fit.jpg';

const demoItems = [
  { link: '#', text: 'Eat Healthy', image: food },
  { link: '#', text: 'Lighter Every Day', image: fit },
];

const Flowing = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {isVisible && (
                <div className={style.backToTop}>
                    <p className={style.backToTopText}>Back to top</p>
                    <button 
                        onClick={scrollToTop} 
                        className={style.backToTopButton} 
                        aria-label="Scroll to top"
                    >
                        <FaArrowUp className={style.backToTopIcon} />
                    </button>
                </div>
            )}
            <div className={style.flowingMenuContainer}>
                <FlowingMenu items={demoItems} />
            </div>
        </>
    );
};

export default Flowing;