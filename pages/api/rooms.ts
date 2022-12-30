// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/dbConnect';
import Room from '../../models/rooms';




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const {method} = req;
    await dbConnect();

    if(method=='GET') {
        const rooms:any = await Room.aggregate([
            {$match:{status:'waiting'}},
            {$sample:{size:1}}
        ]);

        if(rooms.length>0){
            const roomId = rooms[0]._id.toString();
            await Room.findByIdAndUpdate(roomId, {
              status: "chatting",
            });
        /*
        const rooms:any = await Room.find({
            status:req.body.status
         });*/
        res.status(200).json(rooms)
    }}

    if(method=='POST'){
        const room = await Room.create({
            status:'waiting'
        });
        res.status(200).json(room);
    }
    

   
}

