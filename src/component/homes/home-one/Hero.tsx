"use client";
import { useEffect, useState } from "react"

const Hero = () => {
   const [topGainers, setTopGainers] = useState([]);
   useEffect(() => {
      if (!topGainers?.length) {
         const loadCoins = async () => {
            const response = await fetch(`/api/top-gainers`);
            const coinList: any = await response.json();
            setTopGainers(coinList?.topGainers?.top_gainers);
            console.log({gainers: coinList});
          };
          loadCoins();
      }		
	}, [topGainers]);
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
                        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px 20px', marginTop: '20px'}}>
                           {topGainers?.slice(0, 5).map((token: any, index: number) => (
                              <div 
                                 key={index} 
                                 className={`wallet-list-modal-coins-wrapper`}
                                 onClick={() => alert(token.id)}
                              >
                                 <div style={{textAlign: 'center', marginTop: '10px'}}>
                                    <img src={token.image} style={{width: '50px', height: '50px'}}/>
                                 </div>
                                 <p style={{textAlign: 'center', margin: '10px', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                    { token.symbol.toUpperCase() }
                                 </p>
                                 <p style={{textAlign: 'center', margin: '10px', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                    { token.usd.toFixed(2) }
                                 </p>
                                 <p style={{textAlign: 'center', margin: '10px', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                    { token.usd_24h_change }
                                 </p>
                                 <p style={{textAlign: 'center', margin: '10px', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                    { token.usd_24h_vol }
                                 </p>
                              </div>
                           ))}
                        </div>
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
