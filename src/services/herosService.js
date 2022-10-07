const Hero = require('../db/heroModel');
const { WrongPramError } = require('../helpers/errors');
const { s3Uploadv2, s3Deletev2 } = require('./s3service');

const getHeros = async ({ skip, limit }) => {
  try {
    const heros = await Hero.find({}).skip(skip).limit(limit);
    const total = await Hero.find({}).count();
    return { heros, total };
  } catch (error) {
    throw new WrongPramError('Not found');
  }
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
  const heroOld = await Hero.findOne({ _id: id });
  if (file) {
    // upload new file to aws
    const result = await s3Uploadv2(file);
    image = result.Location;

    // delete old file from aws
    await s3Deletev2(heroOld.image);
  } else {
    image = heroOld.image;
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
    const hero = await Hero.findOne({ _id: id });
    await s3Deletev2(hero.image);
    await Hero.findOneAndDelete({ _id: id });
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
