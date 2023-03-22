const { Basket, BasketDevice } = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController {
   async create(req, res, next) {
      try {
         const { deviceId, userId } = req.body;
         let basketId;
         const basket = await Basket.findOne({ userId });

         if (basket) {
            basketId = basket.dataValues.id;
            const findedDevice = await BasketDevice.findOne({
               basketId,
               deviceId,
            });
            if (Number(findedDevice.dataValues.deviceId) === Number(deviceId)) {
               return next(ApiError.badRequest("Device already in cart"));
            }
         }
         if (!basket) {
            const { dataValues } = await Basket.create({ userId });
            basketId = dataValues.id;
         }
         const basketDevice = await BasketDevice.create({ basketId, deviceId });
         return res.json(basketDevice);
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }
   async getBasketDevices(req, res, next) {
      try {
         const { id } = req.params;
         const userBasket = await Basket.findOne({ id });
         const basketId = userBasket.dataValues.id;
         const basketDevices = await BasketDevice.findAll({ basketId });
         return res.json(basketDevices);
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }
}
module.exports = new BasketController();
