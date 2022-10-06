const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: [true, 'nickname required'],
    },
    realName: {
      type: String,
      required: [true, 'real name required'],
    },
    originDescription: {
      type: String,
      required: [true, 'origin description required'],
    },
    superpowers: {
      type: String,
      required: [true, 'superpowers required'],
    },
    catchPhrase: {
      type: String,
      required: [true, 'catch phrase required'],
    },
    image: {
      type: String,
      required: [true, 'Image required'],
    },
  },
  { versionKey: false }
);

const Hero = mongoose.model('heros', heroSchema);

module.exports = Hero;
