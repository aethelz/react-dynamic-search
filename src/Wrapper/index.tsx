import type { PropsWithChildren } from 'react';
import styles from './Wrapper.module.scss';

type Props = {};
const Wrapper = (props: PropsWithChildren<Props>) => {
  return (
    <div className={styles.thrasherPreventer}>
      <div className={styles.mainWrapper}>
        {props.children}
      </div>
    </div>
  );
};

export default Wrapper;
