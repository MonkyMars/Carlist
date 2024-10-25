import styles from '../styles/components/Nav.module.scss';
import { useRouter } from 'next/router';
import Image from 'next/image';
const Nav = () => {
  const router = useRouter();
  const pages: {label: string; href: string}[] = [
    { label: 'Cars', href: '' },
    { label: 'Manufacturers', href: '' }
  ]
  const icons: { icon: string; href: string;}[] = [
    { icon: '/icons/search.png', href: '' },
    { icon: '/icons/setting.png', href: '' }
  ]
  return(
    <>
    <nav className={styles.Nav}>
      <h2>{'Carlist'}</h2>
      <ul>
        {pages?.map((page, index) => (
          <li key={index} onClick={() => router.push(page.href)}>{page.label}</li>
        ))}  
      </ul>
      <div>
        {icons?.map((icon, index) => (
          <Image alt={icon.href} key={index} width={35} height={35} src={icon.icon}/>
        ))}
      </div>
    </nav>
    </>
  )
}

export default Nav;