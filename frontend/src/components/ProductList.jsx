import React,{ useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ProductList = () => {
  const [products,setproducts] = useState([])

   useEffect(()=>{
      getProducts();
   },[])

//   const getProducts = async () =>{
//     const response = await axios.get("http://localhost:5000/products")
//     setproducts(response.data);
//   }
// 
//   const deleteProduct = async(productId) => {
//      await axios.delete(`http://localhost:5000/products/${productId}`);
//      getProducts();
//   }

const getProducts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/products");
    setproducts(response.data); // Set the products data
  } catch (error) {
    console.error("Error fetching products", error);
  }
};

// Delete a product and refresh the list
const deleteProduct = async (productId) => {
  try {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    getProducts(); // Refresh the list after deletion
  } catch (error) {
    console.error("Error deleting product", error);
  }
};

  return (
    <div>
       <h1 className='title'>Products</h1>
       <h2 className='subtitle'>List of Products</h2>
       <Link to="/products/add" className='button is-primary mb-2'>Add New</Link>
       <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product,index)=>(
          <tr key={product.uuid}>
            <td>{index + 1}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.user.name}</td>
            <td>
              <Link 
              to={`/products/edit/${product.uuid}`} className='button is-small is-info'
              >
                Edit
                </Link>
              <button
               onClick={()=> deleteProduct(product.uuid)} className='button is-small is-danger'
               >
                Delete
                </button>
            </td>
          </tr>
          ))}
        </tbody>
       </table>
    </div>
  )
}

export default ProductList


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// 
// const ProductList = () => {
//   // Correctly initialize useState
//   const [products, setProducts] = useState([]);
// 
//   useEffect(() => {
//     getProducts();
//   }, []);
// 
//   // Fetch products from the API
//   const getProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/products");
//       setProducts(response.data); // Set the products data
//     } catch (error) {
//       console.error("Error fetching products", error);
//     }
//   };
// 
//   // Delete a product and refresh the list
//   const deleteProduct = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:5000/products/${productId}`);
//       getProducts(); // Refresh the list after deletion
//     } catch (error) {
//       console.error("Error deleting product", error);
//     }
//   };
// 
//   return (
//     <div>
//       <h1 className='title'>Products</h1>
//       <h2 className='subtitle'>List of Products</h2>
//       <Link to="/products/add" className='button is-primary mb-2'>Add New</Link>
//       <table className='table is-striped is-fullwidth'>
//         <thead>
//           <tr>
//             <th>No</th>
//             <th>Product Name</th>
//             <th>Price</th>
//             <th>Created By</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Add return inside map */}
//           {products.map((product, index) => (
//             <tr key={product.uuid}>
//               <td>{index + 1}</td>
//               <td>{product.name}</td>
//               <td>{product.price}</td>
//               <td>{product.user.name}</td>
//               <td>
//                 <Link to={`/products/edit/${product.uuid}`} className='button is-small is-info'>Edit</Link>
//                 <button onClick={() => deleteProduct(product.uuid)} className='button is-small is-danger'>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// 
// export default ProductList;
