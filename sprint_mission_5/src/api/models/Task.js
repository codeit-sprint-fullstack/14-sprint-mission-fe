import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 30,
      validate: {
        validator: function (title) {
          return title.split(' ').length > 1;
        },
        message: 'title이 반드시 포함되어야 합니다.(2단어 이상, 30자 이내)',
      },
    },
    description: {
      type: String,
      required: true,
      maxLength: 30,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', TaskSchema);  // tasks 컬렉션

export default Task;