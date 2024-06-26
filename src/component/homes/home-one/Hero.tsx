"use client";
import { AppContext } from "@/hooks/AppContext";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";

const Hero = () => {
   const [topGainers, setTopGainers] = useState([]);
   const [topLosers, setTopLosers] = useState([]);
   const [trending, setTrending] = useState<any[]>([]);
   const { globalData, setGlobalData } = useContext(AppContext);
   const [searchNetwork, setSearchNetwork] = useState("");
   useEffect(() => {
      if (!topGainers?.length) {
         const loadCoins = async () => {
            const response = await fetch(`/api/top-gainers`);
            const coinList: any = await response.json();
            setTopGainers(coinList?.topGainers?.top_gainers);
            setTopLosers(coinList?.topGainers?.top_losers);
            // console.log({gainers: coinList});
          };
          loadCoins();
      }		
	}, [topGainers]);

   useEffect(() => {
      if (!trending?.length) {
         const loadCoins = async () => {
            const trendingList = [];
            const response = await fetch(`/api/trending`);
            const coinList: any = await response.json();
            for (const coin of coinList?.trending?.coins.slice(0, 5)) {
               const responseHistory = await fetch(`/api/coin-history?coinId=${coin.item.id}`);
               const coinHistory: any = await responseHistory.json();
               const trendingEach = {...coin, history: coinHistory.coinHistory.prices};
               trendingList.push(trendingEach);
            }
            setTrending(trendingList);
            console.log(trendingList);
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
      const timeInterval = setInterval(() => {
         fetchMarketData();
         let tokenNews = globalData.tokenNews ? [...globalData.tokenNews] : [];
         let isNewsUpdated = false;

         const sortedMarketCap = [...globalData.marketCap].sort((a, b) => 
            Math.abs(a.market_cap_usd) - Math.abs(b.market_cap_usd)
          );
         for (const token of sortedMarketCap) {
            if (Math.abs(token.usd_price_1hr_percent_change) > 2.0) {
               isNewsUpdated = true;
               tokenNews = [`${token.symbol.toUpperCase()}'s price changed with ${parseFloat(token.usd_price_1hr_percent_change).toFixed(2)}%`, ...tokenNews];
               if (tokenNews.length >= 6) {
                  tokenNews.pop();
               }
            }
         }
         if (isNewsUpdated)
            setGlobalData((prevData: any) => ({
               ...prevData,
               tokenNews: tokenNews,
            }));
      }, 1000);
      return () => {
         clearInterval(timeInterval)
      };
	}, []);

   useEffect(() => {
		if (!globalData.marketDataLoaded) {
			fetchMarketData();
		}
	}, []);

   const fetchWallet = async (address: string) => {
		try {
			const response = await fetch(`/api/wallet`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					walletAddress: address,
					chain: globalData.selectedChain ? globalData.selectedChain : "eth",
				}),
			});
			const data = await response.json();

			if (data) {
				setGlobalData((prevData: any) => ({
					...prevData,
					selectedChain: localStorage.getItem("selectedChain") || "eth",
					walletAddress: data.address,
					balance: data.balance ? data.balance : 0,
					chains: data.active_chains,
					networth: data.networth,
					networthArray: {
						labels: data.networthDataLabels,
						data: data.networthDatasets,
					},
					tokenData: data.walletTokens,
					// historicalData: data.historicalBalanceData,
					profile: {
						walletAge: data.walletAge,
						firstSeenDate: data.firstSeenDate,
						lastSeenDate: data.lastSeenDate,
						isWhale: data.isWhale,
						earlyAdopter: data.earlyAdopter,
						multiChainer: data.multiChainer,
						speculator: data.speculator,
						isFresh: data.isFresh,
						ens: data.ens,
					},
					days: "7",
				}));

				// localStorage.setItem("globalData", JSON.stringify(globalData));
			}
		} catch (err) {
			console.log(err);
		}
	};

   const loadMyWallet = () => {
      fetchWallet(globalData.accountIdFromLogin);
   };

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
                  <div className="feature-card-details" style={{maxWidth: 'none', width: '100%'}}>
                     <h4 className="feature-card-title">Market stats & trending</h4>
                     <div 
                        style={{display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center'}}
                     >
                        <div style={{textAlign: 'center', fontWeight: 'bold'}}>
                           Coin
                        </div>
                        <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', width: '7%', fontWeight: 'bold'}}>
                           Symbol
                        </p>
                        {Array.from({ length: 6 }, (_, index) => (
                           <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', width: '7%', fontWeight: 'bold'}}>
                              Price(usd)
                           </p>
                        ))}                        
                        <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', width: '15%', fontWeight: 'bold'}}>
                           Market cap
                        </p>
                        <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', width: '15%', fontWeight: 'bold'}}>
                           Total volume
                        </p>
                        <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', width: '7%', fontWeight: 'bold'}}>
                           Market rank
                        </p>
                     </div>
                     <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px 20px', marginTop: '20px', flexDirection: 'column'}}>
                        {trending?.slice(0, 5).map((token: any, index: number) => (
                           <div 
                              key={index} 
                              style={{display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center'}}
                              onClick={() => console.log(token.item.id)}
                           >
                              <div style={{textAlign: 'center'}}>
                                 <img src={token.item.thumb} style={{width: '30px', height: '30px'}}/>
                              </div>
                              <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', width: '7%'}}>
                                 { token.item.symbol.toUpperCase() }
                              </p>
                              <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', width: '7%'}}>
                                 { token.item.data.price.toFixed(2) }
                              </p>
                              {token.history?.slice().reverse().slice(0, 5).map((price: any, indexPrice: number) => (
                                 <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', width: '7%'}}>
                                    { price[1].toFixed(2) }
                                 </p>
                              ))}                              
                              <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', width: '15%'}}>
                                 { token.item.data.market_cap }
                              </p>
                              <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', width: '15%'}}>
                                 { token.item.data.total_volume }
                              </p>
                              <p style={{textAlign: 'center', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', width: '7%'}}>
                                 { token.item.market_cap_rank }
                              </p>
                           </div>
                        ))}
                     </div>
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
                        <h4 className="feature-card-title">Top losers</h4>
                        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px 20px', marginTop: '20px', flexDirection: 'column'}}>
                           {topLosers?.slice(0, 5).map((token: any, index: number) => (
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
                        <h4 className="feature-card-title">Wallet tracker
                        {globalData.accountIdFromLogin && (
                           <button className="dashboard-wallettracker-my-button" onClick={() => loadMyWallet()}>My Wallet</button>
                        )}                        
                        </h4>
                        {globalData.walletAddress && (
                           <>
                              <div className="dashboard-wallettracker-text-wrapper">
                                 <div style={{textAlign: 'left', textWrap: 'nowrap'}}>
                                    Address :
                                 </div>
                                 <div style={{textAlign: 'left', overflow: 'auto', wordWrap: 'break-word'}}>
                                    {globalData.walletAddress}
                                 </div>
                              </div>
                              <div className="dashboard-wallettracker-text-wrapper">
                                 <div style={{textAlign: 'left', textWrap: 'nowrap'}}>
                                    Total :
                                 </div>
                                 <div style={{textAlign: 'left', overflow: 'auto', wordWrap: 'break-word'}}>
                                    {(globalData.balance / 1e18).toFixed(18)}
                                 </div>
                              </div>
                              {globalData.tokenData.result?.map((token: any, index: number) => (
                                 <div className="dashboard-wallettracker-text-wrapper" key={index}>
                                    <div style={{textAlign: 'center'}}>
                                       {token.symbol} : 
                                    </div>
                                    <div style={{textAlign: 'center'}}>
                                       {token.usd_value.toFixed(2)} usd
                                    </div>
                                 </div>
                              ))}
                           </>
                        )}                        
                     </div>
                  </div>
               </div>
               <div className="col-lg-3">
                  <div className="feature-card mw-100">                  
                     <div className="feature-card-details">
                        <h4 className="feature-card-title">Token alerts</h4>
                        {globalData.tokenNews?.map((news: any, index: number) => (
                           <p style={{textAlign: 'left', marginBottom: '10px', whiteSpace: 'nowrap'}} key={index}>
                              { news }
                           </p>
                        ))}
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
