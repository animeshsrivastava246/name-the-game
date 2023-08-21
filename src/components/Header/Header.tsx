import { Button } from "@mui/material";
import styles from "./header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <Button className={styles.back_btn}>{"<"}</Button>
      <h1 className={styles.logo}>
        <span>Name</span>
        <span>The</span>
        <span>Game</span>
      </h1>
    </div>
  );
}

export default Header;
