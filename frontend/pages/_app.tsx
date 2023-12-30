import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { AppProps } from 'next/app';

const inter = Inter({ subsets: ['latin'] })

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  )
}


export default MyApp
