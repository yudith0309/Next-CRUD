import Footer from "./footer";
import Navigate from "./navigate";

export default function Layout({children}){
  return (
    <>    
    <Navigate/>
    <main>{children}</main>
    <Footer/>    
    </>
  )
}
