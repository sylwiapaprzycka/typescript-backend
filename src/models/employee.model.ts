import mongoose, { Document, Schema, Model } from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';

class employeeSchemaClass {
  @prop({ required: true })
  public firstName: string;

  @prop({ required: true })
  public lastName: string;
  
  @prop({ required: true })
  public department: string 
}

const employeeSchema = getModelForClass(employeeSchemaClass)

export default employeeSchema