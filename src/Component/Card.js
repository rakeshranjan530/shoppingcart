
import { Button } from 'react-bootstrap';
const Card =({name,price,url,handleOnchange,volatile,handleAdd})=>{
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

            {/* <div className="" style={{width:'216px',display:'flex',justifyContent:'space-between'}}>
                <label>QTY</label>
                <input type="text" value='1'/>
                <button>Add</button>
            </div> */}

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">QTY</span>
                </div>
                <input type="text" name={name} className="form-control text-center" value={volatile[name]}/>
                <div className="input-group-append">
                    <Button className="btn btn-warning" name="add" onClick={(e)=>handleAdd(e,name,price,url)}>Add</Button>
                </div>
            </div>





            {/* <div className='quantity'>
                <input type='number' name={name} value={volatile[name]} placeholder="quantity" min={0} onChange={handleOnchange} 
                style={{width:'50%',textAlign:'center'}}/>

                <Button variant='secondary' name="add" onClick={()=>handleOnclick(name,price,url)} size='sm'>ADD</Button>
            </div> */}
            <label>{volatile?.error}</label>
        </div>
    </>
    )
}
export default Card;