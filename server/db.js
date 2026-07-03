import dns from 'dns';
import mongoose from 'mongoose';

dns.setServers(['203.248.252.2', '8.8.8.8']);

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch((err) => console.error('MongoDB 연결 실패:', err));

export default mongoose;