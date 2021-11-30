import express from 'express';
import coinbaseController from '../controllers/coinbaseController';
import indexController from '../controllers/index';

const router = express.Router();

router.get('/', indexController.getIndex)

router.use('/coinbase', coinbaseController)

export = router;