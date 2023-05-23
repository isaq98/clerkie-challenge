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
      <div className="app-container">
        <Navigation setRouteCallback={setRoute}/>
        { route === "Home" ? <h4 className={styles.welcomeMessage}>Welcome to the Clerkie Challenge!</h4> : <Friends />}
      </div>
    </main>
  )
}

/* TODO: send a callback prop through useState in order to pass a prop into the display component to render the correct display page */
