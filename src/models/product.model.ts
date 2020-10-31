import mongoose, { Document, Schema, Model } from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';

class productSchemaClass {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  client: string;
}

const productSchema = getModelForClass(productSchemaClass)

export default productSchema;