import { useEffect, useState } from "react";
import Card from "../Component/Card";
import Header from "../Component/Header";
import data from "../Util/data.json";
const Container =()=>{
    const {vegetable} = data || [];
    const [volatile, setVolatile] = useState({
        error:'',
        qtyArr : [],
        itemCart:[],
        checkName:'',
    })
    const [list, setList]= useState({});

    useEffect(()=>{
        const getName = () => vegetable?.map(el => el.name);
        const res = getName().reduce((acc,curr)=> (acc[curr]='1',acc),{});
        setVolatile((state)=>({
            ...state,
            ...res
        }))
    },[])
    
    const handleOnchange=({target})=>{
        const {name,value} = target;

        setVolatile((state)=>({
            ...state,
            [name]:Number(value)
        }))

    };
    const handleAdd = (e,name,price,url) => {
        const {target} = e;
        let qtyArr = volatile?.qtyArr;
        let itemCart = volatile?.itemCart;
        let checkName = volatile?.checkName;
        let qty = volatile[name]
        const obj = {
            name,
            price,
            url,
            qty,
        }
        if(target.name === 'add'){
            e.target.style.display = 'none'
        }

        console.log('obj',obj)
    }
    const handleOnclick = (name,price,url) => {
        let qtyArr = volatile?.qtyArr;
        let itemCart = volatile?.itemCart;
        let checkName = volatile?.checkName;
        let qty = volatile[name]
        if(!qty) return;
        debugger
        if(checkName === name){
            qtyArr.push(qty)
            // const cartData = [{
            //     name,
            //     price,
            //     qty : qtyArr?.reduce((a,b)=>a+b),
            //     url,
            // }]

            const it = itemCart.map((e)=>{
                if (e.name === name){
                    return(
                        {
                            ...e,
                            qty:qtyArr?.reduce((a,b)=>a+b),
                        }
                    )
                }
            })
            itemCart = [...itemCart,...it];

        }
        else{
            qtyArr  = [qty]
            const cartData = {
                name,
                price,
                qty :qty,
                url,
            }
            itemCart.push(cartData);
        }
        checkName=name;
        setVolatile((state)=>({
            ...state,
            qtyArr,
            itemCart,
            checkName,
        }))
    }
    console.log("dhdabfjdsbfh",volatile?.itemCart)
    useEffect(()=>{
        
    },[volatile])
    return(
        <div>
            <Header
                volatile={volatile}
                setVolatile={setVolatile}
            />
            <br/>
            <br/>
            <br/>
            <div className="listDetails container">
                <div className="row">
            {
                vegetable?.map((el,i)=>{
                    return(
                        <div key={i} className="col-lg-3 col-md-4 mt-4 col-sm-6 co-12">
                         <Card
                            handleOnclick={handleOnclick}
                            handleOnchange={handleOnchange}
                            handleAdd={handleAdd}
                            name={el.name}
                            price={el.price}
                            url={el.url}
                            volatile={volatile}
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