import { AppContext } from '@/hooks/AppContext';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const WatchListModal = ({modalIsOpen, closeModal}: any) => {
  const { globalData, setGlobalData } = useContext(AppContext);
  const [coinList, setCoinList] = useState([]);
  const [searchNetwork, setSearchNetwork] = useState("");
  const [selectCoin, setSelectCoin] = useState<any>({});
  const [conditionPercent, setConditionPercent] = useState("");

  useEffect(() => {
		Modal.setAppElement(document.body); // Ensure this runs on client-side

    const loadCoins = async () => {
      const response = await fetch(`/api/coins`);
      const coinList: any = await response.json();
      setCoinList(coinList.coinList);
    };
    loadCoins();
	}, []);

  const addWatchList = () => {
    const watchList = globalData.watchListArray || [];
    if (selectCoin && !isNaN(parseFloat(conditionPercent))) {
      const coinIndex = watchList.findIndex((coin: any) => coin.id === selectCoin.id);
      if (coinIndex !== -1) {
        watchList[coinIndex] = { ...watchList[coinIndex], condition: conditionPercent };
      } else {
        watchList.push({ ...selectCoin, condition: conditionPercent });
      }
      setGlobalData((prevData: any) => ({
        ...prevData,
        watchListArray: watchList
      }));
      setSelectCoin ({});
    }    
  }

  const editWatchList = (watchCoin: any) => {
    setSelectCoin(watchCoin);
    setConditionPercent(watchCoin.condition);
  }

  const deleteWatchList = (watchCoin: any) => {
    const watchList = globalData.watchListArray || [];
    const updatedWatchList = watchList.filter((coin: any) => coin !== watchCoin);
    setGlobalData((prevData: any) => ({
      ...prevData,
      watchListArray: updatedWatchList
    }));
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      overlayClassName="custom-modal-overlay"
    >
      <button className="custom-modal-close-button" onClick={closeModal}>
        &times;
      </button>
      <div style={{display: 'flex', width: '800px', height: '600px'}}>
        <div style={{width: '40%', backgroundColor: '#0C0D1F', overflow: 'auto', padding: '20px'}}>
          <div>
            <input 
              type="text" 
              placeholder='NETWORK' 
              style={{color: '#fff', backgroundColor: '#202136', border: 'none', padding: '5px'}}
              onChange={(e) => setSearchNetwork(e.target.value)}
              value={searchNetwork}
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px 20px', marginTop: '20px'}}>
            {coinList.filter((coin: any) => coin?.id?.toUpperCase().includes(searchNetwork.toUpperCase()) || coin?.symbol?.toUpperCase().includes(searchNetwork.toUpperCase()) || coin?.name?.toUpperCase().includes(searchNetwork.toUpperCase())).map((token: any, index: number) => (
              <div 
                key={index} 
                className={`wallet-list-modal-coins-wrapper ${selectCoin?.id == token.id && 'active'}`}
                onClick={() => setSelectCoin(token)}
              >
                <div style={{textAlign: 'center', marginTop: '10px'}}>
                  <img src={token.image} style={{width: '50px', height: '50px'}}/>
                </div>
                <p style={{textAlign: 'center', margin: '10px', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                  { token.id.toUpperCase() }
                </p>
              </div>
            ))}
          </div>
        </div>
        <div style={{width: '60%', backgroundColor: '#131428', padding: '30px', overflow: 'auto'}}>
          <p style={{fontSize: '24px', fontWeight:'bold', color: 'white'}}>WATCH LIST</p>
          <div style={{fontSize: '16px', fontWeight:'500', color: 'white'}}>  
            {selectCoin?.image && (
              <>
                <img src={selectCoin?.image} style={{width: '50px', height: '50px'}}/>
                <span style={{marginLeft: '10px', fontSize: '18px'}}>{selectCoin?.symbol?.toUpperCase()}</span>
                <input 
                  type="text" 
                  onChange={(e) => setConditionPercent(e.target.value)} 
                  value={conditionPercent}
                  style={{marginLeft: '20px', padding: '5px 10px', width: '100px'}}/> %
                <button 
                  style={{marginLeft: '50px', padding: '10px 20px', fontSize: '18px'}} 
                  className='dashboard-wallettracker-my-button'
                  onClick={() => addWatchList()}>add</button>     
              </>   
            )}      
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px'}}>
            {globalData.watchListArray?.map((watchCoin: any, index: number) => (
              <div 
                className='wallet-list-modal-wallets-wrapper' 
                style={{justifyContent: 'start'}}
                key={index} 
                onClick={() => editWatchList(watchCoin)}>                
                <div style={{textAlign: 'center'}}>
                  <img src={watchCoin.image} style={{width: '50px', height: '50px'}} alt=""/>
                </div>  
                <p style={{textAlign: 'left', margin: '0 20px'}}>
                  { watchCoin.symbol.toUpperCase() }
                </p> 
                <div style={{textAlign: 'center'}}>
                  {watchCoin.condition}
                </div> 
                <button 
                  style={{marginLeft: '50px', padding: '10px 20px', fontSize: '18px'}} 
                  className='dashboard-wallettracker-my-button'
                  onClick={() => deleteWatchList(watchCoin)}>delete</button>             
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WatchListModal;