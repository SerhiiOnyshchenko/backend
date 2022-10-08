/* eslint-disable no-undef */
const app = require('../src/app');
const request = require('supertest');
const Hero = require('../src/db/heroModel');
const s3service = require('../src/services/s3service');
jest.mock('../src/services/s3service', () => ({
  s3Uploadv2: jest.fn(() => {
    return { Location: '1' };
  }),
  s3Deletev2: jest.fn(),
}));

describe('GET /api/heros', () => {
  test('should return status 200, response body heros list. it is object with keys nickname, real name, origin description, superpowers, catch phrase and image url', async () => {
    const heros = [
      {
        _id: '633ff057e0907d54cfcc8e83',
        nickname: 'Superman',
        realName: 'Clark Kent',
        originDescription:
          "he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction…\r\n",
        superpowers:
          'solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight…',
        catchPhrase:
          "“Look, up in the sky, it's a bird, it's a plane, it's Superman!”",
        image:
          'https://serhiibackend.s3.eu-central-1.amazonaws.com/upload/bc3e4e27-9c54-47aa-b78b-b82d08fcd8f9-644-superman.jpg',
      },
      {
        _id: '633ff057e0907d54cfcc8e83',
        nickname: 'Superman',
        realName: 'Clark Kent',
        originDescription:
          "he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction…\r\n",
        superpowers:
          'solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight…',
        catchPhrase:
          "“Look, up in the sky, it's a bird, it's a plane, it's Superman!”",
        image:
          'https://serhiibackend.s3.eu-central-1.amazonaws.com/upload/bc3e4e27-9c54-47aa-b78b-b82d08fcd8f9-644-superman.jpg',
      },
    ];

    jest.spyOn(Hero, 'find').mockImplementationOnce(() => ({
      skip: () => ({
        limit: () => heros,
      }),
    }));
    jest.spyOn(Hero, 'find').mockImplementationOnce(() => ({
      count: () => 2,
    }));

    const response = await request(app)
      .get('/api/heros')
      .send()
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.body.heros).toEqual(
      expect.objectContaining([
        {
          _id: expect.any(String),
          nickname: expect.any(String),
          realName: expect.any(String),
          originDescription: expect.any(String),
          superpowers: expect.any(String),
          catchPhrase: expect.any(String),
          image: expect.any(String),
        },
        {
          _id: expect.any(String),
          nickname: expect.any(String),
          realName: expect.any(String),
          originDescription: expect.any(String),
          superpowers: expect.any(String),
          catchPhrase: expect.any(String),
          image: expect.any(String),
        },
      ])
    );
  });
});

describe('GET /api/heros/:heroId', () => {
  test('should return status 200, response body hero it is object with keys nickname, real name, origin description, superpowers, catch phrase and image url', async () => {
    const hero = [
      {
        _id: '633ff057e0907d54cfcc8e83',
        nickname: 'Superman',
        realName: 'Clark Kent',
        originDescription:
          "he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction…\r\n",
        superpowers:
          'solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight…',
        catchPhrase:
          "“Look, up in the sky, it's a bird, it's a plane, it's Superman!”",
        image:
          'https://serhiibackend.s3.eu-central-1.amazonaws.com/upload/bc3e4e27-9c54-47aa-b78b-b82d08fcd8f9-644-superman.jpg',
      },
    ];

    jest.spyOn(Hero, 'findOne').mockImplementationOnce(() => hero);

    const response = await request(app)
      .get('/api/heros/633ff057e0907d54cfcc8e83')
      .send()
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.body.hero).toEqual(
      expect.objectContaining([
        {
          _id: expect.any(String),
          nickname: expect.any(String),
          realName: expect.any(String),
          originDescription: expect.any(String),
          superpowers: expect.any(String),
          catchPhrase: expect.any(String),
          image: expect.any(String),
        },
      ])
    );
  });
});

describe('POST /api/heros', () => {
  test('should return status 201, response body hero it is object with keys nickname, real name, origin description, superpowers, catch phrase and image url', async () => {
    const hero = {
      _id: '633ff057e0907d54cfcc8e83',
      nickname: 'Superman',
      realName: 'Clark Kent',
      originDescription:
        "he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction…\r\n",
      superpowers:
        'solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight…',
      catchPhrase:
        "“Look, up in the sky, it's a bird, it's a plane, it's Superman!”",
      image:
        'https://serhiibackend.s3.eu-central-1.amazonaws.com/upload/bc3e4e27-9c54-47aa-b78b-b82d08fcd8f9-644-superman.jpg',
    };
    const heroSend = {
      nickname: 'Superman',
      realName: 'Clark Kent',
      originDescription:
        "he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction…\r\n",
      superpowers:
        'solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight…',
      catchPhrase:
        "“Look, up in the sky, it's a bird, it's a plane, it's Superman!”",
    };

    s3service.s3Uploadv2();
    jest.spyOn(Hero, 'create').mockImplementationOnce(() => hero);

    const response = await request(app).post('/api/heros').send(heroSend);

    expect(response.status).toEqual(201);
    expect(response.body.hero).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        nickname: expect.any(String),
        realName: expect.any(String),
        originDescription: expect.any(String),
        superpowers: expect.any(String),
        catchPhrase: expect.any(String),
        image: expect.any(String),
      })
    );
  });
});

describe('PATCH /api/heros:heroId', () => {
  test('should return status 200, response body hero it is object with keys nickname, real name, origin description, superpowers, catch phrase and image url', async () => {
    const heroOld = {
      _id: '633ff057e0907d54cfcc8e83',
      nickname: 'Superman',
      realName: 'Clark Kent',
      originDescription:
        "he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction…\r\n",
      superpowers:
        'solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight…',
      catchPhrase:
        "“Look, up in the sky, it's a bird, it's a plane, it's Superman!”",
      image:
        'https://serhiibackend.s3.eu-central-1.amazonaws.com/upload/bc3e4e27-9c54-47aa-b78b-b82d08fcd8f9-644-superman.jpg',
    };
    const hero = {
      _id: '633ff057e0907d54cfcc8e83',
      nickname: 'Superman',
      realName: 'Clark Kent',
      originDescription:
        "he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction…\r\n",
      superpowers:
        'solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight…',
      catchPhrase:
        "“Look, up in the sky, it's a bird, it's a plane, it's Superman!”",
      image:
        'https://serhiibackend.s3.eu-central-1.amazonaws.com/upload/bc3e4e27-9c54-47aa-b78b-b82d08fcd8f9-644-superman.jpg',
    };
    const heroSend = {
      nickname: 'Superman',
      realName: 'Clark Kent',
      originDescription:
        "he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction…\r\n",
      superpowers:
        'solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight…',
      catchPhrase:
        "“Look, up in the sky, it's a bird, it's a plane, it's Superman!”",
    };

    jest.spyOn(Hero, 'findOne').mockImplementationOnce(() => heroOld);
    s3service.s3Uploadv2();
    s3service.s3Deletev2(heroOld.image);

    jest.spyOn(Hero, 'findOneAndUpdate').mockImplementationOnce(() => {});
    jest.spyOn(Hero, 'findOne').mockImplementationOnce(() => hero);

    const response = await request(app)
      .patch('/api/heros/633ff057e0907d54cfcc8e83')
      .send(heroSend);

    expect(response.status).toEqual(200);
    expect(response.body.hero).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        nickname: expect.any(String),
        realName: expect.any(String),
        originDescription: expect.any(String),
        superpowers: expect.any(String),
        catchPhrase: expect.any(String),
        image: expect.any(String),
      })
    );
  });
});

describe('DELETE /api/heros/:heroId', () => {
  test('should return status 200, response body message it is string "hero deleted" ', async () => {
    const hero = [
      {
        _id: '633ff057e0907d54cfcc8e83',
        nickname: 'Superman',
        realName: 'Clark Kent',
        originDescription:
          "he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction…\r\n",
        superpowers:
          'solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight…',
        catchPhrase:
          "“Look, up in the sky, it's a bird, it's a plane, it's Superman!”",
        image:
          'https://serhiibackend.s3.eu-central-1.amazonaws.com/upload/bc3e4e27-9c54-47aa-b78b-b82d08fcd8f9-644-superman.jpg',
      },
    ];
    jest.spyOn(Hero, 'findOne').mockImplementationOnce(() => hero);
    s3service.s3Deletev2(hero.image);
    jest.spyOn(Hero, 'findOneAndDelete').mockImplementationOnce(() => {});

    const response = await request(app)
      .delete('/api/heros/633ff057e0907d54cfcc8e83')
      .send()
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'hero deleted',
      })
    );
  });
});
