const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
  try {
    const users = await Product.find()
    res.status(200).json(users)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function(req, res) {
  try {
    const user = await Product.findById(req.params.id)
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req, res) {
    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price   
  })
  try{
      await product.save()
      res.status(201).json(product)
  }catch(e){
      errorHandler(res, e)
  }
}

