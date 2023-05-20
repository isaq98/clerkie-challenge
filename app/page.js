import Image from 'next/image'
import styles from './page.module.css'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <main>
      <div className="app-container">
        <Sidebar />
      </div>
    </main>
  )
}
