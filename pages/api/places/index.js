import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Place.create(placeData);
      return response.status(201).json({ status: "Product create." });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
