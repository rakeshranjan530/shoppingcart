import { useEffect, useState } from "react";
import Card from "../Component/Card";
import Header from "../Component/Header";
import data from "../Util/data.json";
const Container =()=>{
    const {vegetable} = data || [];
    const [volatile,setVolatile]=useState({
        itemList:[],
        cartItem:[],
    })
    const [isModal,setModal] = useState(false)
    useEffect(()=>{
        setVolatile((state)=>({
            ...state,
            itemList:vegetable.map(e=>({
                ...e,
                isAddDisabled:false,
                qty:0,
            }))
        }))
    },[])

    
    const handleSearch=({target})=>{
        const {value} = target;
        const filterData = vegetable?.filter(veg=> veg?.name.toLowerCase().includes(value.toLowerCase()));
        const listData = volatile?.itemList;
        console.log(filterData);
        setVolatile((state)=>({
            ...state,
            itemList:filterData.map((e,i)=>{
                return{
                    ...e,
                    isAddDisabled:listData[i]?.isAddDisabled || null,
                    qty:listData[i]?.qty || null
                }
            })
        }))

    };
    const handleOnclick = (e,name) => {
        const {target} = e;
        if(target.name === 'add'){
            setVolatile((state)=>({
                ...state,
                itemList:state.itemList.map(e=>{
                    if(e.name === name){
                        return {
                            ...e,
                            qty:e.qty+1,
                            isAddDisabled:true,
                        }
                    }
                    return {
                        ...e,
                    }
                })
            }))
        }
        if(target.name === 'incr'){
            setVolatile((state)=>({
                ...state,
                itemList:state.itemList.map(e=>{
                    if(e.name === name){
                        return {
                            ...e,
                            qty:e.qty+1,
                        }
                    }
                    return {
                        ...e,
                    }
                })
            }))
        }
        if(target.name === 'decr'){
            setVolatile((state)=>({
                ...state,
                itemList:state.itemList.map(e=>{
                    if(e.name === name){
                        return {
                            ...e,
                            qty:e.qty-1,
                            isAddDisabled:e.qty === 0,
                        }
                    }
                    return {
                        ...e,
                    }
                })
            }))
        }
    }
    return(
        <div>
            <Header
               itemList = {volatile?.itemList}
               isModal={isModal}
               setModal={setModal}
               handleOnclick={handleOnclick}
               handleSearch={handleSearch}
            />
            <br/>
            <br/>
            <br/>
            <div className="listDetails container">
                <div className="row">
            {
                volatile?.itemList.length === 0  && (<div>No vegetable</div>)
            }
            {
                volatile?.itemList?.map((el,i)=>{
                    return(
                        <div key={el.id} className="col-lg-3 col-md-4 mt-4 col-sm-6 co-12">
                         <Card
                            handleOnclick={handleOnclick}
                            name={el.name}
                            price={el.price}
                            url={el.url}
                            isAddDisabled = {el.isAddDisabled}
                            qty = {el.qty || 1}
                            isDecreamentDisabled={el.isDecreamentDisabled}
                         />
                        </div>
                    )
                })
            }
            </div>
          </div>
        </div>
    )
}
export default Container;