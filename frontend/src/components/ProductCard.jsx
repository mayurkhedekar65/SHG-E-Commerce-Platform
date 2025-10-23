import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot} from "@fortawesome/free-solid-svg-icons";



const ProductCard=({ProductName,GroupName,Amount,Quantity,Location,Logo})=>{
    return(
        <>
        <div className="bg-[#dddddd] rounded-lg text-center w-75 pb-5 shadow-2xl text-[#333333] border border-[#F5C469]">
            <div><img className="rounded-t-lg border-b border-[#F5C469] " src="https://supplysix.com/cdn/shop/articles/Top_Healthy_Food_Items_for_a_Balanced_Diet_Every_Day.png?v=1739961430" alt="not available" /></div>
            <div className="text-left pl-5">
                <h3 className="mt-2 font-bold text-lg">{ProductName}</h3>
                <p className="mt-2">{GroupName}</p>
                <p className="mt-2 md:text-lg text-[15px]"><span className="font-bold">₹{Amount}</span>/{Quantity}ml</p>
                <p className="mt-2"><FontAwesomeIcon  className="mr-1" icon={faLocationDot}/>{Location}</p>
            </div>
            <div className="mt-4 flex justify-center items-center">
                <button className="border border-[#F5C469] capitalize bg-[#333333] py-3 px-9 rounded-lg text-[#F5C469] font-bold flex justify-center items-center "><FontAwesomeIcon className="mr-2 text-2xl" icon={Logo} /> whatapp order</button>
            </div>
        </div>
        </>
    )
}
export default ProductCard;