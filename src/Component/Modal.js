import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import '../index.css'
const ModalComponent = ({isModal,setModal,cartData,handleOnclick}) => {
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
                                    <img src={data.url} alt='loading image' class="img-thumbnail" style={{height:'100px',width:'100px'}}></img>
                                    <div className="ml-1">
                                        <p><b>{data.name} 1 kg</b></p>
                                        <p>{`${data.qty} x ${data.price}`}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <button type="button" class="btn btn-light rounded-circle mr-2" name="decr" onClick={(e)=>handleOnclick(e,data.name)}>&darr;</button>
                                    <p style={{margin:'auto'}}><b>{data.qty}</b></p>
                                    <button type="button" class="btn btn-light rounded-circle ml-2"  name="incr" onClick={(e)=>handleOnclick(e,data.name)}>&uarr;</button>
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
        </Modal>
        
    )
}

export default ModalComponent