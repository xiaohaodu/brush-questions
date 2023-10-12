const express = require('express');
const router = express.Router();

const wrongQuestion = require('../router_handler/wrongQuestion');

router.post('/wrongQuestion', wrongQuestion.postWrongQuestion);
router.get('/wrongQuestion', wrongQuestion.getWrongQuestion);
router.delete('/wrongQuestion', wrongQuestion.deleteWrongQuestion);

module.exports = router;