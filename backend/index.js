const express = require('express');

const app = express();
const cors = require('cors')
app.use(express.json())
app.use(cors())
const multer = require("multer");
const path = require("path")
require('./database/sequelize')
const UserModel = require('./models/user')
//var fs = require('fs');


const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
 storage: storage
})
app.use('/profile_images', express.static('upload/images'));


// app.post("/create_profile", upload.single('profile_image'), async (req, res) => {
// try{
//        var obj = {
//     name: req.body.name,
//     email: req.body.email,
//     img: {
//         data: fs.readFileSync(path.join(__dirname + '/upload/images/' + req.file.filename)),
//         contentType: 'image/png'
//     }
// }
app.post('/create_profile', upload.single('profile_image'), async function (req, res){
    try{ 
            let createUser = await UserModel.create({
                name: req.body.name,
                email: req.body.email,
                profile_image: req.file.path
            
            })
               console.log(createUser)
               res.send(createUser)
        } catch(e){
            res.status(500).send(e.message)
        }
    })


    app.get('/get', async (req, res) => {
        try {
            const users = await UserModel.findAll()
            res.send(users)
        }
        catch (e) {
            res.status(401).send(e)
        }
    })

    app.delete('/delete/:email', async (req, res) => {
        const email = req.params.email
        try {
            const deleteUser = await UserModel.destroy({ where: { "email": email } })
            res.json({ message: 'user deleted' })
        } catch (e) {
            res.status(401).send(e.message)
        }
    });

    app.put('/update', async (req, res) => {
           const email = req.body.email
            const name = req.body.name

            console.log(name, email)
           try {
                const createUpdate = await UserModel.update( {name: name }, { where: { "email": email } })
            res.json({ message: 'user updated' })
        } catch (e) {
            res.status(401).send(e.message)
        }
    });

app.listen(5000, () => {
    console.log("server up and running")
})