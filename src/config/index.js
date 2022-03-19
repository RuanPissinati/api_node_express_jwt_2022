require('dotenv').config();

module.exports = {
  mongo: { uri: process.env.MONGO_URI },
  secret: process.env.SECRET,
}
