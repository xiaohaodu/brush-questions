const express = require('express')
const router = express.Router()

const directory = require('../router_handler/directory')

router.get('/directory',directory.books)

module.exports=router