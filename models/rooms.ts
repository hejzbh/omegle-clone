import mongoose from 'mongoose';

const RoomSchema:any  = new mongoose.Schema({
    status: String,
    _id:String
});
export default mongoose.models.Room || mongoose.model('Room', RoomSchema);