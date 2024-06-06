import Image, { StaticImageData } from "next/image";

import choose_thumb_1 from "@/assets/img/update/bg/bg-gradient1-1.jpg"
import choose_thumb_2 from "@/assets/img/update/normal/why_1-1.png"

import icon_1 from "@/assets/img/update/icon/feature-icon1-1.svg"
import icon_2 from "@/assets/img/update/icon/feature-icon1-2.svg"
import icon_3 from "@/assets/img/update/icon/feature-icon1-3.svg"

interface DataType {
   id: number;
   title: string;
   price: string;
   skill: string;
   value: string;
   value_2: string;
}[];

interface DataType2 {
   id: number;
   icon: StaticImageData;
   title: string;
   price?: string;
   desc: string;
}[];

const amount_data: DataType[] = [
   {
      id: 1,
      title: "Expected FOX price",
      price: "0.36 $",
      skill: "70%",
      value: "100",
      value_2: "100,000",
   },
   {
      id: 2,
      title: "Expected FOX price",
      price: "0.36 $",
      skill: "80%",
      value: "100",
      value_2: "100,000",
   },
   {
      id: 3,
      title: "Calculation time",
      price: "Q3 2020",
      skill: "40%",
      value: "100",
      value_2: "100,000",
   },
];

const choose_data: DataType2[] = [
   {
      id: 1,
      icon: icon_1,
      title: "The expected value of your investment",
      price: "180,000",
      desc: "ROI = 360 %",
   },
   {
      id: 2,
      icon: icon_2,
      title: "Expected monthly dividend",
      desc: "3600 FOX = 1296 $",
   },
   {
      id: 3,
      icon: icon_3,
      title: "Masternode bonus",
      price: "180,000",
      desc: "ROI = 360 %",
   },
]

const ChooseArea = () => {
   return (
      <div className="wcu-area-1 pt-130 pb-140 position-relative" id="feature">
         <div className="bg-gradient-1">
            <Image src={choose_thumb_1} alt="img" />
         </div>
         <div className="container">
            <div className="mb-25">
               <div className="row gy-5">
                  <div className="col-lg-7">
                     <div className="section-title mb-0">
                        <h2 className="title style2">Why You Choose IKO is worth buying today?</h2>
                        <p className="sec-text">Use the window for the planned investment  and calculate the estimated <br /> Iko price and your monthly dividends at a fixed time
                        </p>
                     </div>
                  </div>
                  <div className="col-lg-5">
                     <div className="wcu-thumb text-center alltuchtopdown">
                        <Image src={choose_thumb_2} alt="img" />
                     </div>
                  </div>
               </div>
            </div>
            <div className="row gy-5 justify-content-between">
               <div className="col-lg-5">
                  <div className="wcu-amount-quantity">
                     <div className="amount">
                        <h5 className="title">Amount invested</h5>
                        <p className="price">50,000 $</p>
                     </div>
                     <div className="quantity">
                        <h5 className="title">Quantity Iko</h5>
                        <p className="price">500,000 Iko</p>
                     </div>
                  </div>
                  <ul className="wcu-price-progress-wrap">
                     {amount_data.map((item) => (
                        <li key={item.id}>
                           <h6 className="progress-wrap-title">{item.title}</h6>
                           <p className="progress-wrap-text">{item.price}</p>
                           <div className="skill-feature">
                              <div className="progress">
                                 <div className="progress-bar" style={{ width: item.skill }}>
                                 </div>
                              </div>
                              <div className="progress-value">
                                 <span>{item.value} $</span>
                                 <span>{item.value_2} $</span>
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="col-lg-6">
                  {choose_data.map((item) => (
                     <div key={item.id} className="feature-card">
                        <div className="feature-card-icon">
                           <Image src={item.icon} alt="img" />
                        </div>
                        <div className="feature-card-details">
                           <h4 className="feature-card-title">{item.title}</h4>
                           {item.price && <p className="feature-card-text">{item.price} $</p>}
                           <p className="feature-card-text">{item.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>

            </div>
         </div>
      </div>
   )
}

export default ChooseArea
