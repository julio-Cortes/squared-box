import type { NextPage } from 'next'
import Head from 'next/head'
import Login from '../components/Login'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={'bg-tl-grey'}>
      <Head>
        <title>Alpes cuadratura caja</title>
        <meta name="description" content="Alpes cuadratura caja" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login/>
    </div>
  )
}

export default Home
