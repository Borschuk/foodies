import Link from 'next/link';
import Image from 'next/image';

import logoImg from '@/public/images/logo.png';
import classes from './MainHeader.module.css';
import MainHeaderBackground from './MainHeaderBackground';
import NavLink from './NavLink';

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={logoImg} alt="NextLevel Food" priority width={100} height={100} /> NextLevel
          Food
        </Link>

        <nav className={classes.nav}>
          <ul className={classes.nav}>
            <li className={classes.navItem}>
              <NavLink href="/meals">Meals</NavLink>
            </li>
            <li className={classes.navItem}>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
