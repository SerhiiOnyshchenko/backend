const {
  getHeros,
  addHero,
  getHeroById,
  patchHeroById,
  deleteHeroById,
} = require('../services/herosService');

const getHerosController = async (req, res) => {
  let { page = 1, limit = 5 } = req.query;
  limit = limit > 5 ? 5 : Number(limit);
  const skip = (page - 1) * limit;
  const { heros, total } = await getHeros({ skip, limit });
  res.json({ heros, page, total, status: 'success' });
};

const addHeroController = async (req, res) => {
  const body = req.body;
  const hero = await addHero(body, req.file);
  res.status(201).json({ hero, status: 'success' });
};

const getHeroByIdController = async (req, res) => {
  const { heroId } = req.params;
  const hero = await getHeroById(heroId);
  if (!hero) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json({ hero, status: 'success' });
};

const deleteHeroByIdController = async (req, res) => {
  const { heroId } = req.params;
  await deleteHeroById(heroId);
  res.json({ message: 'hero deleted' });
};

const patchHeroController = async (req, res) => {
  const { heroId } = req.params;
  const body = req.body;
  const hero = await patchHeroById(heroId, body, req.file);
  res.json({ hero, status: 'success' });
};

module.exports = {
  getHerosController,
  addHeroController,
  getHeroByIdController,
  deleteHeroByIdController,
  patchHeroController,
};
