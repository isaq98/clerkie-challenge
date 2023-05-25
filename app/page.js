'use client';
import { useState } from 'react';
import Image from 'next/image'
import styles from './page.module.css'
import Navigation from '@/components/Navigation'
import Friends from '@/components/Friends'


export default function Home() {
  const [route, setRoute] = useState('Home');
  return (
    <main>
      <Navigation setRouteCallback={setRoute}/>
      <div className={styles.appContainer}>
        { route === "Home" ? <div className={styles.welcomeContainer}><h4 className={styles.welcomeMessage}>Welcome to the Clerkie Challenge!</h4></div> : <Friends />}
      </div>
    </main>
  )
}
