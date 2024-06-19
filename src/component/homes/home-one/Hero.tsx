"use client";
import { AppContext } from "@/hooks/AppContext";
import { useContext, useEffect, useState } from "react"

const Hero = () => {
   const [topGainers, setTopGainers] = useState([]);
   const [trending, setTrending] = useState([]);
   const { globalData, setGlobalData } = useContext(AppContext);
   const [searchNetwork, setSearchNetwork] = useState("");
   useEffect(() => {
      if (!topGainers?.length) {
         const loadCoins = async () => {
            const response = await fetch(`/api/top-gainers`);
            const coinList: any = await response.json();
            setTopGainers(coinList?.topGainers?.top_gainers);
            // console.log({gainers: coinList});
          };
          loadCoins();
      }		
	}, [topGainers]);

   useEffect(() => {
      if (!trending?.length) {
         const loadCoins = async () => {
            const response = await fetch(`/api/trending`);
            const coinList: any = await response.json();
            setTrending(coinList?.trending?.coins);
            console.log(coinList?.trending?.coins);
          };
          loadCoins();
      }		
	}, [trending]);

   const addFavourite = (token: any) => {
      setSearchNetwork("");
      const originalArray = globalData.favourites || [];
      const favourites = [token, ...originalArray];
      setGlobalData((prevData: any) => ({
			...prevData,
			favourites: favourites,
		}));
   }; 

   const fetchMarketData = () => {
		setGlobalData((prevData: any) => ({
			...prevData,
			marketCap: null,
			tradingVolume: null,
			marketDataLoaded: false,
		}));
		fetch(`/api/market-data`)
			.then((response) => {
				if (!response.ok) throw new Error("Failed to fetch data");
				return response.json();
			})
			.then((fetchedData) => {
				setGlobalData((prevData: any) => ({
					...prevData,
					marketCap: fetchedData.market_cap,
					tradingVolume: fetchedData.trading_volume,
					topTokens: fetchedData.top_tokens,
					nftMarketCap: fetchedData.nft_market_cap,
					nftVolume: fetchedData.nft_volume,
					marketDataLoaded: true,
				}));
			})
			.catch((error) => {
				
			});
	};

	useEffect(() => {
		if (!globalData.marketDataLoaded) {
			fetchMarketData();
		}
	}, []);

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
                     <div className="feature-card-details" style={{width: '100%'}}>
                        <h4 className="feature-card-title">Top gainer</h4>
                        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px 20px', marginTop: '20px', flexDirection: 'column'}}>
                           {topGainers?.slice(0, 5).map((token: any, index: number) => (
                              <div 
                                 key={index} 
                                 style={{display: 'flex', alignItems: 'center', gap: '20px'}}
                                 onClick={() => console.log(token.id)}
                              >
                                 <div style={{textAlign: 'center'}}>
                                    <img src={token.image} style={{width: '30px', height: '30px'}}/>
                                 </div>
                                 <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', width: '40%'}}>
                                    { token.symbol.toUpperCase() }
                                 </p>
                                 <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                    { token.usd.toFixed(2) }
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
                     <div className="feature-card-details" style={{width: '100%'}}>
                        <h4 className="feature-card-title">Trending</h4>
                        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px 20px', marginTop: '20px', flexDirection: 'column'}}>
                           {trending?.slice(0, 5).map((token: any, index: number) => (
                              <div 
                                 key={index} 
                                 style={{display: 'flex', alignItems: 'center', gap: '20px'}}
                                 onClick={() => console.log(token.item.id)}
                              >
                                 <div style={{textAlign: 'center'}}>
                                    <img src={token.item.thumb} style={{width: '30px', height: '30px'}}/>
                                 </div>
                                 <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', width: '40%'}}>
                                    { token.item.symbol.toUpperCase() }
                                 </p>
                                 <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                    { token.item.data.price.toFixed(2) }
                                 </p>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row mt-3">
               <div className="col-lg-3">
                  <div className="feature-card mw-100">                  
                     <div className="feature-card-details" style={{width: '100%'}}>
                        <h4 className="feature-card-title">Favourites</h4>
                        <div>
                           <input 
                              type="text" 
                              placeholder='Search' 
                              style={{color: '#fff', backgroundColor: '#202136', border: 'none', padding: '10px', width: '100%'}}
                              onChange={(e) => setSearchNetwork(e.target.value)}
                              value={searchNetwork}
                           />
                        </div>
                        {searchNetwork && globalData.marketCap?.filter((coin: any) => coin?.id?.toUpperCase().includes(searchNetwork.toUpperCase()) || coin?.symbol?.toUpperCase().includes(searchNetwork.toUpperCase()) || coin?.name?.toUpperCase().includes(searchNetwork.toUpperCase())).slice(0, 3).map((token: any, index: number) => (
                           <div 
                              key={index} 
                              className="dashboard-favourite-add"
                              onClick={() => addFavourite(token)}
                           >
                              <div style={{textAlign: 'center'}}>
                                 <img src={token.logo} style={{width: '30px', height: '30px'}}/>
                              </div>
                              <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', width: '40%'}}>
                                 { token.symbol.toUpperCase() }
                              </p>
                              <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                 { token.usd_price }
                              </p>
                           </div>
                        ))}
                        {!searchNetwork && globalData.favourites?.slice(0, 5).map((token: any, index: number) => (
                           <div 
                              key={index} 
                              style={{display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px'}}
                           >
                              <div style={{textAlign: 'center'}}>
                                 <img src={token.logo} style={{width: '30px', height: '30px'}}/>
                              </div>
                              <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', width: '30%'}}>
                                 { token.symbol.toUpperCase() }
                              </p>
                              <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                                 { token.usd_price }
                              </p>
                           </div>
                        ))}
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
