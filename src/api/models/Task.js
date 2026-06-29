import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 30,
    },
    description: {
      type: String,
      required: true,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', TaskSchema);  // tasks 컬렉션

export default Task;