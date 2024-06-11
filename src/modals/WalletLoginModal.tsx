import TokenLogo from '@/component/portfolio/tokenlogo';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { object } from 'yup';

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

const walletList = [
  {
    'id': 'metamask', 
    'image': require('@/assets/img/wallet/metamask.png'),
    'supportedCoins': ['ethereum'],
  }, 
  {
    'id': 'coinbase', 
    'image': require('@/assets/img/wallet/coinbase.png'),
    'supportedCoins': ['ethereum', 'bitcoin', 'solana', 'dogecoin', 'litecoin'],
  }, 
  {
    'id': 'trustwallet', 
    'image': require('@/assets/img/wallet/trustwallet.png'),
    'supportedCoins': ['ethereum', 'tron', 'polygon', 'bitcoin'],
  }, 
  {
    'id': 'exodus', 
    'image': require('@/assets/img/wallet/exodus.png'),
    'supportedCoins': ['ethereum', 'bitcoin', 'solana', 'cardano', 'avalanche', 'polygon', 'fantom'],
  }, 
];

const WalletLoginModal = ({modalIsOpen, closeModal}: any) => {
  const [coinList, setCoinList] = useState([]);
  const [searchNetwork, setSearchNetwork] = useState("");
  const [selectCoin, setSelectCoin] = useState<any>({});
  const [selectWalletList, setSelectWalletList] = useState<any>(walletList);

  useEffect(() => {
		Modal.setAppElement(document.body); // Ensure this runs on client-side

    const loadCoins = async () => {
      const response = await fetch(`/api/coins`);
      const coinList: any = await response.json();
      setCoinList(coinList.coinList);
    };
    loadCoins();
	}, []);

  useEffect(() => {
		if (selectCoin.symbol) {
      const loadCoins = async () => {
        const response = await fetch(`/api/coin-lists`);
        const coinList: any = await response.json();
        const coin = coinList.coinList.filter((c: any) => c.name.toLowerCase() === selectCoin.name.toLowerCase() && c.symbol.toLowerCase() === selectCoin.symbol.toLowerCase());
        const possibleWallet: any[] = [];
        for (const coinIndividual of coin) {
          const responseDetail = await fetch(`/api/coin-detail?coinId=${coin ? coinIndividual.id : null}`);
          const coinDetail: any = await responseDetail.json();
          Object.keys(coinDetail.coinDetail.platforms).forEach(network => {
            if (network == '') network = 'bitcoin';
            for (const wallet of walletList) {
              if ((wallet.supportedCoins.includes(network) || wallet.supportedCoins.includes(selectCoin.id)) && !possibleWallet.includes(wallet)) {
                possibleWallet.push(wallet);
              }
            }
          });
        }        
        setSelectWalletList(possibleWallet);
      };
      loadCoins();
    }
	}, [selectCoin]);

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
          <p style={{fontSize: '24px', fontWeight:'bold', color: 'white'}}>SELECT A WALLET</p>
          <p style={{fontSize: '16px', fontWeight:'500', color: 'white'}}>
            {selectCoin?.id?.toUpperCase()} 
            {selectCoin?.image && (
              <img src={selectCoin?.image} style={{width: '50px', height: '50px', marginLeft: '30px'}}/>
            )}            
          </p>
          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            {selectWalletList.map((wallet: any, index: number) => (
              <div className='wallet-list-modal-wallets-wrapper' key={index}>
                <p style={{textAlign: 'center', margin: 0}}>
                  { wallet.id.toUpperCase() }
                </p>
                <div style={{textAlign: 'center'}}>
                  <Image src={wallet.image} style={{width: '50px', height: '50px'}} alt=""/>
                </div>                
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WalletLoginModal;