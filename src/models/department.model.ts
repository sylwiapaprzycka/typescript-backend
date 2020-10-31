import mongoose, { Document, Schema, Model } from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';

class departmentSchemaClass {
  @prop ({ required: true, minlength: 5, maxlength: 20 }) 
  public name: string;  
}

const departmentSchema = getModelForClass(departmentSchemaClass);

export default departmentSchema