import React,{useContext, useEffect,useState} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
//import axios from "../utils/axios"
import Loading from './Loading'
import { ProductContext } from '../utils/Context'
const Details = () => {
  const navigate=useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const [product,setproduct]=useState(null)
  const {id}=useParams();
  // const getsingleproduct= async()=>{
  //   try {
  //     const {data}= await axios.get(`/products/${id}`)
  //     setproduct(data);
  //   } catch (error) {
  //     console.log(error);      
  //   }
  // };
  useEffect(()=>{
    if(!product){
      setproduct(products.filter((p)=>p.id==id)[0]);
    }
   // getsingleproduct();
  },[]);
  const productDeleteHandler =(id)=>{
    const FilterProducts=products.filter(p=>p.id!==id);
    setproducts(FilterProducts);
    localStorage.setItem("products",JSON.stringify(FilterProducts));
    navigate("/")
  }
  return product ? (
    <div className="w-[70%] h-full  m-auto flex p-[10%] justify-between items-center">
      <img className=' w-[45%] h-[80%] object-cover'  src={product.image} alt="" />
      <div className="content  w-[50%]">
        <h1 className='text-3xl'>{product.title}</h1>
        <h3 className='text-zinc-900 my-4'>{product.category}</h3>
        <h2 className='text-red-300 '>${product.price}</h2>
        <p className=' mb-[5%]'>{product.description}</p>
        <Link to={`/edit/${product.id}`} className=' mr-4 py-2 px-5 border rounded border-green-500 text-green-300'>Edit</Link>
        <button  onClick={()=>productDeleteHandler(product.id)} className= ' mr-4 py-2 px-5 border rounded border-red-500 text-red-300'>Delete</button>
      </div>
    </div>) :(<Loading/>)
}

export default Details
