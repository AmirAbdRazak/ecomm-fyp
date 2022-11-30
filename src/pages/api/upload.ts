import prodDetail from './product_details.json'

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
//   const item = await prisma.Item.findMany();

  prodDetail.forEach( async(prod) => {
    const prodCreate = await prisma.item.create({
        data: prod,
    });

    console.log("Uploaded Item" + prod.id);
  })

  res.status(200).json("Items succesfully uploaded");
};

// export default upload;