const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email, role) => {
   return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
      expiresIn: "24h",
   });
};

class UserController {
   async registration(req, res, next) {
      try {
         const { email, password, role } = req.body;
         if (!email || !password) {
            return next(ApiError.badRequest("Incorrect email or password "));
         }
         const candidate = await User.findOne({ where: { email } });
         if (candidate) {
            return next(ApiError.badRequest("User already exists"));
         }
         const hashPassword = await bcrypt.hash(password, 5);
         const user = await User.create({
            email,
            role,
            password: hashPassword,
         });
         const basket = Basket.create({ userid: user.id });
         const token = generateJwt(user.id, user.email, user.role);

         return res.json({ token });
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }

   async login(req, res, next) {
      try {
         const { email, password } = req.body;

         const user = await User.findOne({ where: { email } });
         if (!user) {
            return next(ApiError.internal(`User doesn't exist`));
         }
         const comparePassword = bcrypt.compareSync(password, user.password);

         if (!comparePassword) {
            return next(ApiError.internal(`Wrong password`));
         }

         const token = generateJwt(user.id, user.email, user.role);
         return res.json({ token });
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }
   async checkUser(req, res, next) {
      const { user } = req;

      try {
         const token = generateJwt(user.id, user.email, user.role);
         return res.json({ token });
      } catch (error) {
         return next(ApiError.badRequest(error.message));
      }
   }
}
module.exports = new UserController();
