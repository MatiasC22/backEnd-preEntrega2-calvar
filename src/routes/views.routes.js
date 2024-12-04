import {Router} from "express";

const router = new Router();

// let food = [
//     {name: "Hamburguesa", price: "100"},
//     {name: "Lasagña", price: "90"},
//     {name: "Banana", price: "80"},
//     {name: "Rabioles", price: "70"},
//     {name: "Soda", price: "10"}
// ]


// router.get('/food',(req,res)=>{
//     let userData = {
//         name:"Jesus",
//         last_name:"Gonzales",
//         role:"admin",
//     }

//     res.render("food",{
//         user: userData,
//         isAdmin: userData.role == 'admin',
//         food
//     })
// })


router.get('/message',(req,res)=>{
    
    res.render('messages')
})
    



export default router;