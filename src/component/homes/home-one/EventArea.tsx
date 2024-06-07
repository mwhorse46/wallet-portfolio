import Image from "next/image"

import event_bg from "@/assets/img/update/bg/bg-gradient1-2.jpg"
import event_data from "@/data/EventData"
import Link from "next/link"
import CtaArea from "./CtaArea"

const EventArea = () => {
   return (
      <div className="pt-50 pb-30 overflow-hidden">
         <div className="container">
            <div className="row gy-40 justify-content-between">               
               <div className="col">
                  <div className="feature-card mw-100">                  
                     <div className="feature-card-details">
                        <h4 className="feature-card-title">Market stats & trending</h4>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default EventArea
