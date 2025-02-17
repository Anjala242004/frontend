import { createContext, useEffect, useState } from "react";
import axios from "axios"; // Make sure axios is imported


export const StoreContext=createContext(null)

const StoreContextProvider=(props)=>{
 
    const[cartItems,setCartItems]=useState({})
    const url="http://localhost:5000"

    const [token,setToken]=useState(localStorage.getItem("token") || "")
    const[food_list,setFoodlist]=useState([])


    useEffect(() => {
        console.log("Token updated:",token)
        if (token) {
          localStorage.setItem("token", token);
        } else {
          localStorage.removeItem("token"); // Clear token on logout
        }
      }, [token]);
      

    const addToCart=async(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        
    }

    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in  cartItems){
            if(cartItems[item]>0){
                let itemInfo=food_list.find((product)=>product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList=async()=>{
        const response=await axios.get(url+"/api/food/list")
        setFoodlist(response.data.data)
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
            }
        }
        loadData()
    },[])

    const contextValue={
         food_list,
         cartItems,
         setCartItems,
         addToCart,
         removeFromCart,
         getTotalCartAmount,
         url,
         token,
         setToken
    }
    
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;