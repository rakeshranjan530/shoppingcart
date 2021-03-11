import { Button } from 'react-bootstrap';
import ModalComponent from './Modal';
const Header =({
    itemList,
    isModal,
    setModal,
    handleOnclick,
    handleSearch,
})=>{
    const cartData = itemList?.filter(item => item.qty !== 0);
    const badgeLength = cartData.length;
    return(
    <>
     
        {
            isModal && (<ModalComponent isModal={isModal} setModal={setModal} cartData={cartData} handleOnclick={handleOnclick}/>)
        }
      <div className='heading'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-4 col-md-4 col-12'>
                    <h4>ShopingCart</h4>
                </div>
                <div className="input-group col-lg-5 col-md-5 col-12">
                    <input className="form-control py-2 border-right-0 border" type="search" onChange={handleSearch} placeholder='search vegetable' id="example-search-input"/>
                    <span className="input-group-append bg-white">
                        <button className="btn btn-outline-secondary border-left-0 border" type="button">
                            <i className="fa fa-search"></i>
                        </button>
                    </span>
                </div>
                <div className='col-lg-3 col-12 col-md-3' style={{display:'flex',justifyContent:'flex-end'}}>
                    <Button type="button" name="modal" variant="light" data-toggle="modal" data-target="#myModal" onClick={()=>setModal(true)}>
                     Items cart <span className="badge badge-light">{badgeLength}</span>
                    </Button>
                </div>    
            </div>
        </div> 
     </div>   
    </>
    )
}
export default Header;