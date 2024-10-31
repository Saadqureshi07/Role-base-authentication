import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import {Op, where} from "sequelize"; 


export const getProduct = async(req,res) => {
  try {
     let response;
     if(req.role === "admin"){
      response = await Products.findAll({
        attributes:['uuid','name','price'],
        include:[{
          model:Users,
          attributes:['name','email']
        }]
      })
     }else{
      response = await Products.findAll({
        attributes:['uuid','name','price'],              
        where:{
           userId:req.userId
        }, 
        include:[{
          model:Users,
          attributes:['name','email']
        }]
      })
     }
     res.status(200).json(response)
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}


export const getProductById = async(req,res) => {
  try {
     const product = await Products.findOne({
      where:{
        uuid:req.params.id
      }
     })
     if(!product) return res.status(400).json({msg:"Product not found"})
      let response;
    if(req.role === "admin"){
       response = await Products.findOne({
        attributes:['uuid','name','price'],
        where:{
          id:product.id
        },
        include:[{
          model:Users,
          attributes:['name','email']
        }]
       })
    }else{
       response = await Products.findOne({
        attributes:['uuid','name','price'],
         where:{
          [Op.and]:[{id:product.id},{userId:req.userId}],
         },
         include:[{
          model:Users,
          attributes:['name','email']
         }]
       })
    } 
     return res.status(201).json(response)
  } catch (error) {
     res.status(404).json({msg:"Product not found"})
  }
}


export const createProduct = async(req,res) => {
  const {name,price} = req.body
   try {
    await Products.create({
      name:name,
      price:price,
      userId:req.userId
    })   
     res.status(201).json({msg:"Product created Successfully"})
   } catch (error){
     res.status(500).json({msg:error.message})
   }
}

export const updateProduct = async(req,res) => {
     try {
       const  product = await Products.findOne({
        where:{
          uuid:req.params.id
        }
       })
       if(!product) return res.status(404).json({msg:"Product not found"})
        const {name,price} = req.body;
        if(req.role === "admin"){
            await Products.update({name,price},{
              where:{
                id:product.id
              }
            })
            // console.log(req.body,"error1")
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg:" Access is Forbidden"})
             await Products.update({name,price},{
              where:{
                [Op.and]:[{id:product.id},{userId:req.userId}],
              }
             });
            //  console.log(req.body,"error2")
        }
     return res.status(200).json({msg:"Product update Successfully"});
   } catch (error) {
       res.status(500).json({err:error.message})
     }
}


export const deleteProduct = async(req,res) => {
    try {
      const product = await Products.findOne({
        where:{
          uuid:req.params.id
        }
      })
     if(!product) return res.status(404).json({msg:"Product not found"})
      if(req.role === "admin"){
        await Products.destroy({
          where:{
            id:product.id
          }
        })
      }else{
        if(req.userId !== product.userId) return res.status(403).json({msg:"access is forbiden"})
        await Products.destroy({
          where:{
            [Op.and]:[{id:product.id},{userId:req.userId}],
          }
        })
      }
      res.status(200).json({msg:"Product deleted successfully"})
    } catch (error) {
      res.status(500).json({msg:error.message})
    }
} 