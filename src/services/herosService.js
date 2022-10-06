const Hero = require('../db/heroModel');
const path = require('path');
const Jimp = require('jimp');
const { WrongPramError, NoAuthorizedError } = require('../helpers/errors');
const { uploadDir, downloadDir } = require('../middlewares/uploadMiddleware');

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

  Jimp.read(`${uploadDir}/${file.filename}`, (err, image) => {
    if (err) {
      throw new NoAuthorizedError('Not authorized');
    }
    image
      .resize(320, 480) // resize
      .write(`${downloadDir}/${file.filename}`); // save
  });
  const image = path.resolve(`${downloadDir}/${file.filename}`);

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
    Jimp.read(`${uploadDir}/${file.filename}`, (err, image) => {
      if (err) {
        throw new NoAuthorizedError('Not authorized');
      }
      image
        .resize(320, 480) // resize
        .write(`${downloadDir}/${file.filename}`); // save
    });
    image = path.resolve(`${downloadDir}/${file.filename}`);
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
