import Product from '../models/product.model'

export const getAll = async (req, res) => {
  try {
    res.json(await Product.find())
  }
  catch(err) {
    res.status(500).json({ message: err })
  }
}

export const getRandom = async (req, res) => {
  try {
    const count = await Product.countDocuments()
    const rand = Math.floor(Math.random() * count)
    const prod = await Product.findOne().skip(rand)
    if(!prod) res.status(404).json({ message: 'Not found' })
    else res.json(prod)
  }
  catch(err) {
    res.status(500).json({ message: err })
  }
}

export const getId = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id)
    if(!prod) res.status(404).json({ message: 'Not found' })
    else res.json(prod)
  }
  catch(err) {
    res.status(500).json({ message: err })
  }
}

export const post = async (req, res) => {
  try {
    const { name, client } = req.body
    const newProduct = new Product({ name, client })
    await newProduct.save() 
    res.json({ message: 'OK' })
  } 
  catch(err) {
    res.status(500).json({ message: err })
  }
}

export const putId = async (req, res) => {
  const { name, client } = req.body
  try {
    const prod = await Product.findById(req.params.id)
    if(prod) {
      await Product.updateOne({ _id: req.params.id }, { $set: { name, client }})
      res.json({ prod })
    }
    else res.status(404).json({ message: 'Not found...' })
  }
  catch(err) {
    res.status(500).json({ message: err })
  }
}

export const deleteId = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id)
    if(prod) {
      await Product.deleteOne({ _id: req.params.id })
      res.json({ prod })
    }
    else res.status(404).json({ message: 'Not found...' })
  }
  catch(err) {
    res.status(500).json({ message: err })
  }
}