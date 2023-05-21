import Image from 'next/image'
import styles from './page.module.css'
import Sidebar from '@/components/Sidebar'
import TopMenu from '@/components/TopMenu'

export default function Home() {
  return (
    <main>
      <div className="app-container">
        <Sidebar />
        <TopMenu />
      </div>
    </main>
  )
}
