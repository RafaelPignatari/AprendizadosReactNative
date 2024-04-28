const express = require('express');
const router = express.Router();
const LancheController = require('../controller/LancheController');
const LancheValidation = require('../middlewares/LancheValidation');

router.post('/', LancheValidation,  LancheController.create);
router.put('/:id', LancheValidation,  LancheController.update);
router.delete('/:id',  LancheController.delete);
router.get('/:id',  LancheController.get);
router.get('/filter/getAll',  LancheController.getAll);
router.get('/filter/getNextId',  LancheController.getNextId);

module.exports = router;