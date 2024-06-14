import { AppContext } from '@/hooks/AppContext';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Web3 from 'web3';
import WalletConnectClient from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import MetaMaskSDK from '@metamask/sdk';

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
  const { globalData, setGlobalData } = useContext(AppContext);
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
		if (globalData.wallet == undefined) {
      setGlobalData((prevData: any) => ({
        ...prevData,
        wallet: ""
      }));
    }
	}, [globalData]);

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

  const selectWallet = (walletId: string) => {
    setGlobalData((prevData: any) => ({
      ...prevData,
      wallet: walletId
    }));
    closeModal();
  };

  const connectMetamask = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const web3Instance = new Web3(window.ethereum);
      // setWeb3(web3Instance);

      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts: any) => {
          setGlobalData((prevData: any) => ({
            ...prevData,
            accountIdFromLogin: accounts?.[0] ?? null
          }));
        })
        .catch(err => {
          console.log(err.message);
        });

      window.ethereum.on('accountsChanged', (accounts: any) => {
        setGlobalData((prevData: any) => ({
          ...prevData,
          accountIdFromLogin: accounts?.[0] ?? null
        }));
      });
    } else {
      console.log('MetaMask is not installed or not active');
    }
  };

  const connectCoinbase = async () => {
    try {
      const coinbaseWallet = new CoinbaseWalletSDK({});
      const DEFAULT_ETH_JSONRPC_URL = "https://mainnet.infura.io/v3/mwhorse"; // Replace with your Infura Project ID
      const DEFAULT_CHAIN_ID = 1;
  
      const ethereum:any = coinbaseWallet.makeWeb3Provider();
  
      const web3 = new Web3(ethereum);
  
      await ethereum.enable();
  
      const accounts = await web3.eth.getAccounts();
      setGlobalData((prevData: any) => ({
        ...prevData,
        accountIdFromLogin: accounts[0]
      }));
    } catch (error) {
      console.log('Cant connect to wallet');
    }
  };

  const connectExodus = async () => {
    try {
      const connector = new WalletConnectClient({
        bridge: 'https://bridge.walletconnect.org', // WalletConnect bridge URL
        qrcodeModal: QRCodeModal,
      });

      if (!connector.connected) {
        await connector.createSession();
        QRCodeModal.open(connector.uri, () => {
          console.log('QR Code Modal closed');
        });
      }

      connector.on('connect', (error, payload) => {
        if (error) {
          throw error;
        }
        const { accounts } = payload.params[0];
        setGlobalData((prevData: any) => ({
          ...prevData,
          accountIdFromLogin: accounts[0]
        }));
      });

      connector.on('session_update', (error, payload) => {
        if (error) {
          throw error;
        }
        const { accounts } = payload.params[0];
        setGlobalData((prevData: any) => ({
          ...prevData,
          accountIdFromLogin: accounts[0]
        }));
      });
    } catch (err) {
      console.error('WalletConnect error:', err);
    }
  };

  useEffect(() => {
		if (globalData.wallet == 'metamask' || globalData.wallet == 'trustwallet') {
      setGlobalData((prevData: any) => ({
        ...prevData,
        wallet: ""
      }));
      connectMetamask();
    } else if (globalData.wallet == 'coinbase') {
      setGlobalData((prevData: any) => ({
        ...prevData,
        wallet: ""
      }));
      connectCoinbase();
    } else if (globalData.wallet == 'exodus') {
      setGlobalData((prevData: any) => ({
        ...prevData,
        wallet: ""
      }));
      connectExodus();
    }
	}, [globalData.wallet]);

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
              <div className='wallet-list-modal-wallets-wrapper' key={index} onClick={() => selectWallet(wallet.id)}>
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