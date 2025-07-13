import { ListingsSearch } from './components/listings-search/listings-search';
import styles from './styles.module.css';

const Main = (): JSX.Element => {
  return (
    <main className={styles['container']}>
      <section className={styles['hero']}>
        <h1 className={styles['hero-title']}>
          Unlock the power of knowledge and <br /> expertise.
        </h1>
        <ListingsSearch
          isLabelHidden
          label="search"
          placeholder="Search for skill"
        />
        <h3 className={styles['hero-subtitle']}>
          Find the best skill-sharing sessions in one place.
        </h3>
      </section>
    </main>
  );
};

export { Main };
