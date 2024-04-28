const express = require('express');
const router = express.Router();
const AlunoController = require('../controller/AlunoController');

router.post('/',  AlunoController.create);
router.get('/:id',  AlunoController.get);
router.get('/filter/getAll',  AlunoController.getAll);
router.get('/filter/getNextId',  AlunoController.getNextId);

module.exports = router;