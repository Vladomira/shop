const { Op } = require("sequelize");
const { Basket, BasketDevice, Device } = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController {
   async create(req, res, next) {
      try {
         const { deviceId, userId } = req.body;
         let basketId;
         console.log("deviceId^userId ", deviceId, userId);
         const basket = await Basket.findOne({ userId });
         if (basket) {
            basketId = basket.dataValues.id;
            const findedDevice = await BasketDevice.findOne({
               where: {
                  deviceId: deviceId,
               },
            });

            console.log("sdfg ", findedDevice);
            if (findedDevice) {
               return (
                  Number(findedDevice.dataValues.deviceId) ===
                     Number(deviceId) &&
                  next(ApiError.badRequest("Device already in cart"))
               );
            } else if (!findedDevice) {
               const basketDevice = await BasketDevice.create({
                  basketId,
                  deviceId,
               });
               return res.json(basketDevice);
            }
         }
         if (!basket) {
            const { dataValues } = await Basket.create({ userId });
            basketId = dataValues.id;
            const basketDevice = await BasketDevice.create({
               basketId,
               deviceId,
            });
            return res.json(basketDevice);
         }
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }
   async getBasketDeviceById(req, res, next) {
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
   async getBasketDevicesInfo(req, res, next) {
      const { userId } = req.params;
      try {
         const userBasket = await Basket.findOne({ userId });
         const devicesIds = await BasketDevice.findAll({
            where: { basketId: userBasket.dataValues.id },
         }).then((data) => data.map((el) => el.deviceId));
         const devicesInfo = await Device.findAll({
            where: { id: devicesIds },
         });
         return res.json(devicesInfo);
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }
}
module.exports = new BasketController();
