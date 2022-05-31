const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const assert = require("assert");
const sharp = require('sharp')
const { sendWelcomeEmail, sendGoodByeEmail } = require('../emails/account')
const router = new express.Router()

const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('File type must be either jpg, jpeg or png'))
        }
        cb(undefined, true)
    }

})
router.post('/users/me/avatar',auth, upload.single('avatar'), async (req, res) =>{
    // req.user.avatar = req.file.buffer
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send()

})
router.get('/users/:id/avatar', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    }catch (e) {
        res.send(404).send()
    }
})

router.post('/users', async (req, res) =>{
    const user = new User(req.body);
    try{
        const saveUser = await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await saveUser.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }

})



router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout',auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()

        res.send()
    }catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()

        res.send()
    }catch (e) {
        res.status(500).send()
    }

})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id
//     try {
//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch (e) {
//         res.status(500).send()
//     }
//
// })

router.delete('/users/me', auth, async (req, res) => {
    try{
        // const user = User.findByIdAndDelete(req.params.id)
        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove()
        sendGoodByeEmail(req.user.email, req.user.name)
        res.send(req.user)
    }catch (e) {
        res.status(500).send(e)
    }

})

router.patch('/users/me',auth, async (req, res ) => {
    const updateValues = ["name", "age", "email", "password"]
    const updates = Object.keys(req.body);
    console.log(updates)
    const isUserValid = updates.every((uKey) => {
        return updateValues.includes(uKey)
    })
    if(!isUserValid){
        return res.status(404).send({error: 'you enter invalid key'})
    }
    try {
        // const user = req.user;
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators: true})
        // if(!user){
        //     return res.status(404).send()
        // }
        res.send(req.user)
    }catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;