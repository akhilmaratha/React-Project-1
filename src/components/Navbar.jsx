import React,{useContext} from 'react'
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [products] = useContext(ProductContext);
 
  let distinct_catergory= products&& products.reduce((acc,cv)=>[...acc,cv.category],[])
  distinct_catergory=[...new Set(distinct_catergory)];

  const color=()=>{
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.4)`;
  };

  return (
    
    <nav className="w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-5">
        <a
          className="py-2 px-5 border rounded border-blue-300 text-blue-400  "
          href="/create"
        >
          Add Products
        </a>
        <hr className=" my-3  w-[80%]" />
        <h1 className="text-2xl mb-4 w-[80%]">Catergory Filter</h1>
        <div className="w-[80%]">
          {distinct_catergory.map((c,i)=>(
         <Link key={i} to={`/?category=${c}`} className=" flex items-center  mb-3">
            <span style={{backgroundColor:color()}} className=" mr-2 rounded-full w-[15px] h-[15px]"></span>
           {c}
          </Link>   
          ))}
          
        </div>
      </nav>
      
  )
}

export default Navbar
