import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [products, setproducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product,setproduct]=useState(null);
  const [title, settitle] = useState(product);
  const [image, setimage] = useState(product);
  const [category, setcategory] = useState(product);
  const [price, setprice] = useState(product);
  const [description, setdescription] = useState(product);

  useEffect(() => {
    setproduct(products.filter((p)=>p.id==id)[0]);
  }, [id]);
  const addproducthandler = (e) => {
    e.preventDefault();
    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      price.trim().length < 1 ||
      description.trim().length < 5
    ) {
      alert("No field must be empty");
      return;
    }
    const product = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };
    setproducts([...products, product]);
    localStorage.setItem("products", JSON.stringify([...products, product]));
    // toast.success("New Product Added")
    navigate("/");
  };
  return (
    <form
      onSubmit={addproducthandler}
      className=" flex flex-col items-center p-[4%] w-screen h-screen"
    >
      <h1 className="mb-5 w-1/2 text-3xl">Edit New Products</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-3xl bg-zinc-200 rounded p-3 mb-3  w-1/2"
        onChange={(e) => setimage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="title"
        className="text-3xl bg-zinc-200 rounded p-3 mb-3  w-1/2"
        onChange={(e) => settitle(e.target.value)}
        value={title}
      />
      <div className="flex w-1/2 justify-between">
        <input
          type="text"
          placeholder="category"
          className="text-3xl bg-zinc-200 rounded p-3 mb-3  w-[48%]"
          onChange={(e) => setcategory(e.target.value)}
          value={category}
        />
        <input
          type="number"
          placeholder="price"
          className="text-3xl bg-zinc-200 rounded p-3 mb-3  w-[48%]"
          onChange={(e) => setprice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        onChange={(e) => setdescription(e.target.value)}
        value={description}
        className="text-3xl bg-zinc-200 rounded p-3 mb-3  w-1/2"
        placeholder="Enter Product Description Here"
        rows="15"
      ></textarea>
      <div className="w-1/2 ">
        <button className="  py-2 px-5 border rounded border-blue-300 text-blue-400  ">
          Add Products
        </button>
      </div>
    </form>
  );
};

export default Edit;
