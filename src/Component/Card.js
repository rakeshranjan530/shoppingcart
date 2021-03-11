
import { Button } from 'react-bootstrap';
const Card =({name,price,url,handleOnclick,isAddDisabled,qty})=>{

    return(
    <>
        <div className='card'>
            <div className='cardimage'>
                <img src={url} alt='loading image'/>
            </div>
            <div className='section'>
                <label>{name}</label><br/>
                <label>1kg</label><br/>
                <label>price : {price}</label>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    {
                        (isAddDisabled 
                            && 
                            (<Button className="btn btn-warning" name="decr" onClick={(e)=>handleOnclick(e,name)}>-</Button>))
                            ||
                            (
                                <span className="input-group-text">QTY</span>
                            )
                    }
                    
                </div>
                <span type="text" name={name} className="form-control text-center">{qty}</span>
                <div className="input-group-append">
                    {
                        (isAddDisabled && (
                            <Button className="btn btn-warning" name="incr" onClick={(e)=>handleOnclick(e,name)}>+</Button>
                        ))
                        ||
                        (
                            <Button className="btn btn-warning" name="add" onClick={(e)=>handleOnclick(e,name)}>Add</Button>
                        )
                    }
                    
                </div>
            </div>
        </div>
    </>
    )
}
export default Card;