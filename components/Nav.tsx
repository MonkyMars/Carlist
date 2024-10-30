import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/components/Nav.module.scss';

interface NavLink {
  label: string;
  href: string;
}

interface NavIcon {
  icon: string;
  href: string;
  label: string;
}

const Nav: React.FC = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links: NavLink[] = [
    { label: 'Manufacturers', href: '/manufacturers' },
    { label: 'CarFinder', href: '/carfinder' },
    { label: 'Compare', href: '/compare' }
  ];

  const icons: NavIcon[] = [
    { icon: '/icons/search.png', href: '/search', label: 'Search' },
    { icon: '/icons/setting.png', href: '/settings', label: 'Settings' }
  ];

  const handleNavigation = (href: string) => {
    if (href) {
      router.push(href);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <h2 
          onClick={() => router.push('/')}
          className={styles.logo}
        >
          CarList
        </h2>

        <button 
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Image
            src="/icons/menu.png"
            alt="Menu"
            width={24}
            height={24}
          />
        </button>

        <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          {links.map((link, index) => (
            <li 
              key={`nav-link-${index}`}
              onClick={() => handleNavigation(link.href)}
              className={router.pathname === link.href ? styles.active : ''}
            >
              {link.label}
            </li>
          ))}
        </ul>

        <div className={styles.navIcons}>
          {icons.map((icon, index) => (
            <button
              key={`nav-icon-${index}`}
              onClick={() => handleNavigation(icon.href)}
              className={styles.iconButton}
              aria-label={icon.label}
            >
              <Image
                alt={icon.label}
                width={24}
                height={24}
                src={icon.icon}
              />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;