const Hero = require('../db/heroModel');
const { WrongPramError } = require('../helpers/errors');
const { s3Uploadv2 } = require('./s3service');

const getHeros = async ({ skip, limit }) => {
  const heros = await Hero.find({}).skip(skip).limit(limit);
  const total = await Hero.find({}).count();
  return { heros, total };
};

const getHeroById = async id => {
  try {
    const hero = await Hero.findOne({ _id: id });
    return hero;
  } catch (error) {
    throw new WrongPramError('Not found');
  }
};

const addHero = async (body, file) => {
  const { nickname, realName, originDescription, superpowers, catchPhrase } =
    body;
  const result = await s3Uploadv2(file);
  const image = result.Location;

  const hero = await Hero.create({
    nickname,
    realName,
    originDescription,
    superpowers,
    catchPhrase,
    image,
  });
  return hero;
};

const patchHeroById = async (id, body, file) => {
  const { nickname, realName, originDescription, superpowers, catchPhrase } =
    body;
  let image = null;
  if (file) {
    const result = await s3Uploadv2(file);
    image = result.Location;
  }

  try {
    await Hero.findOneAndUpdate(
      { _id: id },
      {
        nickname,
        realName,
        originDescription,
        superpowers,
        catchPhrase,
        image,
      }
    );
    const hero = await Hero.findOne({ _id: id });
    return hero;
  } catch (error) {
    throw new WrongPramError('Not found');
  }
};

const deleteHeroById = async id => {
  try {
    await Hero.findOneAndDelete({ id });
  } catch (error) {
    throw new WrongPramError('Not found');
  }
};
module.exports = {
  getHeros,
  getHeroById,
  addHero,
  patchHeroById,
  deleteHeroById,
};
