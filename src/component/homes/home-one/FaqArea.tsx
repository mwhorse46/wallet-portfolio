import Image from "next/image";
import faq_data from "@/data/FaqData";

import faq_thumb_1 from "@/assets/img/update/normal/faq_1-1.png";

const FaqArea = () => {
   
   return (
      <div className="pt-50 pb-140 overflow-hidden">
         <div className="container">
            <div className="row gy-40 justify-content-between">               
               <div className="col">
                  <div className="feature-card mw-100">     
                     <div className="col-12">
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
               </div>
            </div>
         </div>
      </div>
   )
}

export default FaqArea
