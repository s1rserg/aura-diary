import { NavLink } from 'react-router-dom';

import styles from './styles.module.css';
import { ValueOf } from '../../common/types/types';
import { AppPath } from '../../common/enums/enums';

type Properties = {
  children: React.ReactNode;
  to: ValueOf<typeof AppPath>;
};

const Link = ({ children, to }: Properties): JSX.Element => (
  <NavLink className={styles['link'] as string} to={to}>
    {children}
  </NavLink>
);

export { Link };
export { Navigate, NavLink } from 'react-router-dom';
