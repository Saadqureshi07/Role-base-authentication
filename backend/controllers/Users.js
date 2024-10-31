import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  //  try {
  //    const response = Users.findAll();
  //   //  console.log(response)
  //    res.status(200).json(response)
  //  } catch (error) {
  //   res.status(500).json({msg:error.message});
  //  }
  let getall = await Users.findAll({
    attributes: ["uuid", "name", "email", "role"]
  }).catch((err) => {
    return { err: err };
  });
  res.send(getall);
};

export const getUserById = async (req, res) => {
  // try {
  //   const response = Users.findOne({
  //     attributes:["uuid","name","email","role"],
  //     where :{
  //        uuid:req.params.id
  //   }});
  //   res.status(200).json(response)
  // } catch (error) {
  //   res.status(500).json({msg:error.message})
  // }
  let findOneUser = await Users.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.params.id
    }
  }).catch((err) => {
    return { error: err };
  });
  res.send(findOneUser);
};


export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword) {
    return res.status(400).json({ msg: "confirm password doesn't match with password" });
  }
  let hashPassword = await argon2.hash(password);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role
    });
    res.status(201).json({ msg: "Register Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id
    }
  });
  if (!user) return res.status(404).json({ msg: "User Doesn't Found" });
  const { name, email, password, confPassword, role } = req.body;
  // console.log(req.body)
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res.status(400).json({ msg: "confpassword doesn't match with password" });
  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role
      },
      // req.body,   // optional
      {
        where: {
          id:user.id
        }
      }
    );
    res.status(201).json({ msg: "User update successfully" });
  } catch (error) {
    res.send(400).json({ msg: error.message });
  }
};


export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id
    }
  });
  if (!user) return res.status(404).json({ msg: "User Doesn't found" });
  try {
    await Users.destroy({
      where: {
        uuid: req.params.id
      }
    });
    res.status(200).json({ msg: "User Deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
