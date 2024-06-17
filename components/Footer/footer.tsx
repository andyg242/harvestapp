import styles from '../Footer/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <h2>Footer navigation items</h2>
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <a href=''>Link 1</a>
        </li>
        <li className={styles.navItem}>
          <a href=''>Link 2</a>
        </li>
        <li className={styles.navItem}>
          <a href=''>Link 3</a>
        </li>
      </ul>
    </footer>
  );
}