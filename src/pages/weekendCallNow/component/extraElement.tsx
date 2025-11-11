import { useNavigate } from "react-router-dom";
import { TiggerFBContactEvent } from "../../../components/Analytics/events";

export function BookNow() {
 
   
    return (
        <div className='mx-auto px-4 lg:px-32 text-center py-8 lg:py-16' >
         
           <a   href="tel:022-69315865"
           onClick={() => {
            //  TiggerFBContactEvent()
             return false;
           }}
           className="cursor-pointer rounded bg-brand-primary font-outfit text-white py-4 font-medium lg:text-xl px-10 lg:px-12">Call Now</a> 

        </div>
    );
}
