const mongoose = require('mongoose');
const Card = require('../models/card');


module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({message: 'Ошибка по умолчанию'}));
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
      res.status(400).send({
        message: 'Переданы некорректные данные при создании карточки.',
      });
      } else {
        res.status(500).send({message: 'Ошибка по умолчанию'});
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.owner)
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: 'Карточка c указанным id не найдена' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Переданы некорректные данные карточки.',
        });
      } else {
        res.status(500).send({message: 'Ошибка по умолчанию'});
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: 'Карточка c указанным id не найдена' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({
            message: 'Переданы некорректные данные для постановки лайка.',
          });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
}

module.exports.dislikeCard = (req, res) => {Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res
        .status(404)
        .send({ message: 'Карточка c указанным id не найдена' });
    }
    return res.status(200).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res
        .status(400)
        .send({
          message: 'Переданы некорректные данные для удаления лайка.',
        });
    }
    return res.status(500).send({ message: 'Ошибка по умолчанию' });
  });
}