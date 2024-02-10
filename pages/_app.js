import '../styles/globals.css'
import {useRouter} from 'next/router'

// context 
import ModalReducer from '../context/ModalReducer'
import TokenReducer from '../context/TokenReducer'
import DashboardReducer from '../context/dashboardReducer'
// componets
import Navbar from '../components/shared/navbar'
import Footer from '../components/shared/footer'
import Head from 'next/head'


function MyApp({ Component, pageProps ,  location }) {
  const { pathname } = useRouter();
  return (
    <>
    
    <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    </Head>

    <div dir='rtl'>
      <DashboardReducer>
      <TokenReducer >
      <ModalReducer>

       {pathname !== '/student' ? pathname !== '/pannel' ? <Navbar/> : '' : '' }
       <Component {...pageProps} />
       {pathname !== '/student' ? pathname !== '/pannel' ? <Footer/> : '' : '' }
       {/* {pathname !== '/student' && <Footer /> } */}
       </ModalReducer>
      </TokenReducer>
      </DashboardReducer>
    </div>
    
    </>
  )

}
export default MyApp
