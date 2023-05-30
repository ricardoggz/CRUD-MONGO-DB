const { userModel } = require('../models/user.model.js')
//Operaciones CRUD con usuarios

//Create save()
const saveUser = async(req, res)=>{
    //req = solicitud (cliente)
    //res = respuesta (servidor)
    try {
        const user = new userModel({
            username: req.body.username,
            email : req.body.email,
            password: req.body.password
        })
        //Método save
        await user.save()
        //Mandar respuesta
        return res
        .status(201)
        .json({
            message: 'Usuario creado con éxito'
        })
        .send()
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

//Read find()
const getAllUsers = async(req, res)=>{
    try {
        //Método find
        const users = await userModel.find()
        return res
        .status(200)
        .json({
            users: users
        })
        .send()
    } catch (error) {
        return res.json({
            error : error
        })
    }
}

//Update findByIdAndUpdate()
const updateUser = async(req, res)=>{
    try {
        await userModel.findByIdAndUpdate(
            //ID 
            req.params.id,
            //Nuevos datos a actualizar
            {
                username: req.body.username,
                email : req.body.email,
                password: req.body.password
            }
        )
        return res
        .status(200)
        .json({
            message: 'Usuario actualizado con éxito'
        })
        .send()
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

//Delete findByIdAndDelete()
const deleteUser = async(req, res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res
        .status(200)
        .json({
            message: 'Usuario eliminado correctamente'
        })
        .send()
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

//login
const loginUser = async(req, res)=>{
    try {
       const user = await userModel.findOne({
        email: req.body.email,
        password: req.body.password
       })
       if(!user) return res.json({
        message: 'Usuario no encontrado',
        isAuth: false
       })
       return res.json({
        message: 'Acceso correcto',
        isAuth: true
       })
    } catch (error) {
        return res.json({
            error: error
        })
    }
}
module.exports ={
    saveUser,
    getAllUsers,
    updateUser,
    deleteUser,
    loginUser
}