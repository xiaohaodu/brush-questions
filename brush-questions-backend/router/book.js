const express = require('express')
const router = express.Router()

const book = require('../router_handler/book')

router.get('/get_books',book.getBook)

module.exports=router