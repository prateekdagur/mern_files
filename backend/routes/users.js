// const express = require('express');
// const app = express();
// const multer = require("multer");
// const path = require("path")
// const UsersModel = require('../models/user')


// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const upload = multer({
//  storage: storage
// })
// app.use('/profile', express.static('upload/images'));


// app.post("/create_profile", upload.single('profile'), (req, res) => {

//        if (!req.file) {
//         console.log("No file received");
//         return res.send({
//           success: false
//         });
    
//       } else {
        
//         res.json({
//             success:1,
//             profile_url: `http://localhost:3000/profile/${req.file.filename}`
//         })

        
//       }
  
// })
// router.post('/create_profile', async function (req, res) {
//     try {
//         let createUser = await UsersModel.create({
//             name: req.body.name,
//             email: req.body.email,
           
//         });
//         res.send(createUser)
//     }
//     catch (err) {
//         res.status(500).send(err.message)
//     }
// })

// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const user_id = req.params.id
//         const deleteUser = await UsersModel.destroy({ where: { "id": user_id } })
//         res.json({ message: 'user deleted' })
//     } catch (e) {
//         res.status(401).send(e.message)
//     }
// });
// router.get('/get', async (req, res) => {
//     try {
//         const users = await UsersModel.findAll()
//         res.send(users)
//     }
//     catch (e) {
//         res.status(401).send(e)
//     }
// })

