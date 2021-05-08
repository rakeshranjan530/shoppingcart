import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import '../index.css';
import image from '../assets/image.jpeg';
const ModalComponent = ({isModal,setModal,cartData,handleOnclick,}) => {

    const isScriptAdded = async (src)=>{
        return new Promise(resolve=>{
            const script = document.createElement('script');
            script.src = src;
            script.onload=()=>{
                resolve(true);
            }
            script.onerror=()=>{
                resolve(false)
            }
            document.body.appendChild(script);
        })
    }
    const buyVegetables = async(totalValue) => {
        const res = await isScriptAdded('https://checkout.razorpay.com/v1/checkout.js');
        if(!res){
            alert("Razorpay is failed to laod, Are you online?");
            return;
        }
        const amount = (totalValue*100).toString();
        var options = {
            "key": "rzp_test_zlbws4Uv3OeKqF", // Enter the Key ID generated from the Dashboard
            amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Razorpay",
            "description": "Cryptoleague Test Transaction",
            "image": image,
            // "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();//open pop pup
    }

    const totalValue =  cartData?.reduce((total,el)=> total + el.qty*el.price,0);
    const renderList = () => {
        if(cartData.length === 0) return <h3>Cart is empty. Please add vegetables</h3>
        return(
            <>
                {
                    cartData.map((data,i)=>{
                        return(
                            <div key={data.id} className="d-flex justify-content-between mt-2 bg-white p-2 align-items-center">
                                <div className="d-flex align-items-center">
                                    <img src={data.url} alt='loading image' className="img-thumbnail" style={{height:'100px',width:'100px'}}></img>
                                    <div className="ml-1">
                                        <p><b>{data.name} 1 kg</b></p>
                                        <p>{`${data.qty} x ${data.price}`}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <button type="button" className="btn btn-light rounded-circle mr-2" name="decr" onClick={(e)=>handleOnclick(e,data.name)}>&darr;</button>
                                    <p style={{margin:'auto'}}><b>{data.qty}</b></p>
                                    <button type="button" className="btn btn-light rounded-circle ml-2"  name="incr" onClick={(e)=>handleOnclick(e,data.name)}>&uarr;</button>
                                </div>
                                <div className="mr-1">
                                    <b>Rs. {data.qty*data.price}</b>
                                </div>
                            </div>
                        )
                    })
                }
            </>
        )
    }
    return(
        <Modal
            open={isModal}
            onClose={()=>setModal(false)} 
            center
            classNames={{
                overlayAnimationIn: 'customEnterOverlayAnimation',
                overlayAnimationOut: 'customLeaveOverlayAnimation',
                modalAnimationIn: 'customEnterModalAnimation',
                modalAnimationOut: 'customLeaveModalAnimation',
                modal: 'customModal',
              }}
              animationDuration={800}
        >
            {renderList()}
            <br/>
            <div className='footer'>Total Rs.{totalValue}</div>
            <div style={{display: "flex",justifyContent:"flex-end", margin:"15px 10px 0px 0px"}}>
                <button style={{width:"100px",backgroundColor:"green",color:"white",border:"0px"}}
                   onClick={()=>buyVegetables(totalValue)} >BUY</button>
            </div>
        </Modal>
        
    )
}

export default ModalComponent