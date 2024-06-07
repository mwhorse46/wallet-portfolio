import Image from "next/image"
import Link from "next/link"

import hero_thumb from "@/assets/img/update/hero/hero-1-1.jpg"
import CountdownClock from "@/ui/CountDownClock"

const Hero = () => {
   return (
      <div className="hero-wrapper hero-1">
         <div className="hero-bg-gradient">
         </div>
         <div className="ripple-shape">
            <span className="ripple-1"></span>
            <span className="ripple-2"></span>
            <span className="ripple-3"></span>
            <span className="ripple-4"></span>
            <span className="ripple-5"></span>
         </div>

         <div className="container">
            <div className="hero-style1 pt-5">
               <div className="feature-card mw-100">                  
                  <div className="feature-card-details">
                     <h4 className="feature-card-title">Market stats & trending</h4>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-lg-3">
                  <div className="feature-card mw-100">                  
                     <div className="feature-card-details">
                        <h4 className="feature-card-title">Top gainer</h4>
                     </div>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="feature-card mw-100">                  
                     <div className="feature-card-details">
                        <h4 className="feature-card-title">Ads</h4>
                     </div>
                  </div>
               </div>
               <div className="col-lg-3">
                  <div className="feature-card mw-100">                  
                     <div className="feature-card-details">
                        <h4 className="feature-card-title">Trending</h4>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row mt-3">
               <div className="col-lg-3">
                  <div className="feature-card mw-100">                  
                     <div className="feature-card-details">
                        <h4 className="feature-card-title">Favourites</h4>
                     </div>
                  </div>
               </div>
               <div className="col-lg-3">
                  <div className="feature-card mw-100">                  
                     <div className="feature-card-details">
                        <h4 className="feature-card-title">Wallet tracker</h4>
                     </div>
                  </div>
               </div>
               <div className="col-lg-3">
                  <div className="feature-card mw-100">                  
                     <div className="feature-card-details">
                        <h4 className="feature-card-title">Token alerts</h4>
                     </div>
                  </div>
               </div>
               <div className="col-lg-3">
                  <div className="feature-card mw-100">                  
                     <div className="feature-card-details">
                        <h4 className="feature-card-title">Airdrop alerts</h4>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Hero
