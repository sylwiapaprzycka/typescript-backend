import Product from '../models/product.model'
import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response) => {
  try {
    res.json(await Product.find())
  }
  catch(err) {
    res.status(500).json({ message: err })
  }
}

export const getRandom = async (req: Request, res: Response) => {
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

export const getId = async (req: Request, res: Response) => {
  try {
    const prod = await Product.findById(req.params.id)
    if(!prod) res.status(404).json({ message: 'Not found' })
    else res.json(prod)
  }
  catch(err) {
    res.status(500).json({ message: err })
  }
}

export const post = async (req: Request, res: Response) => {
  try {
    const { name, client } = req.body
    const ProductData = { name, client }
    const newProduct = await Product.create(ProductData)
    res.json({ message: 'OK' })
  } 
  catch(err) {
    res.status(500).json({ message: err })
  }
}

export const putId = async (req: Request, res: Response) => {
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

export const deleteId = async (req: Request, res: Response) => {
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
