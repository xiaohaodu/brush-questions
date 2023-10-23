const express =require('express')
const router = express.Router()

const passage = require("../router_handler/passage");

router.get('/get_passages',passage.getPassage)

module.exports=router