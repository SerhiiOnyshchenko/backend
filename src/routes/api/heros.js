const express = require('express');
const {
  addHeroValidation,
  patchHeroValidation,
} = require('../../middlewares/validationMiddleware');
const {
  getHerosController,
  addHeroController,
  getHeroByIdController,
  deleteHeroByIdController,
  patchHeroController,
} = require('../../controllers/herosController');
const { asyncWrapper } = require('../../helpers/apiHelpes');
const { uploadMiddleware } = require('../../middlewares/uploadMiddleware');

const router = new express.Router();

router
  .route('/')
  .get(asyncWrapper(getHerosController))
  .post(
    uploadMiddleware.single('image'),
    addHeroValidation,
    asyncWrapper(addHeroController)
  );

router
  .route('/:heroId')
  .get(asyncWrapper(getHeroByIdController))
  .delete(asyncWrapper(deleteHeroByIdController))
  .patch(
    uploadMiddleware.single('image'),
    patchHeroValidation,
    asyncWrapper(patchHeroController)
  );

router.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/heros or /api/heros/:heroId',
    data: 'Not found',
  });
});

module.exports = router;
