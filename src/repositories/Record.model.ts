import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IRecord extends Document {
  key: String;
  createdAt: Date;
  counts: [Number];
  value: String;
}

interface RecordAttrs {
  key: String;
  createdAt: Date;
  counts: [Number];
  value: String;
}

interface RecordModel extends Model<IRecord> {
  build(attrs: RecordAttrs): IRecord;
}

const recordSchema: Schema = new Schema({
  key: String,
  createdAt: Date,
  counts: [Number],
  value: String,
});

recordSchema.statics.build = (attrs: RecordAttrs) => {
  return new Record(attrs);
};

const Record = mongoose.model<IRecord, RecordModel>('Record', recordSchema);

export default Record;
