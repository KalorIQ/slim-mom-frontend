import strawberry from "../../assets/svg/background/strawberry.svg";
import leaf from "../../assets/svg/background/leaf.svg";
import banana from "../../assets/svg/background/banana.svg";
import backshadow from "../../assets/svg/background/shadow.svg";
import styles from "./MobileBackground.module.css";

const MobileBackground = () => {
  return (
    <div className={styles.mobileContainer}>
      <img
        src={backshadow}
        alt="shadow"
        className={styles.shadow}
      />
      <img
        src={leaf}
        alt="leaf"
        className={styles.leaf}
      />
      <img
        src={banana}
        alt="banana"
        className={styles.banana}
      />
      <img
        src={strawberry}
        alt="strawberry"
        className={styles.strawberry}
      />
    </div>
  );
};

export default MobileBackground; 