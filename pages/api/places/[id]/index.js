import dbConnect from "../../../../db/connect.js";
import Place from "../../../../db/models/Place.js";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "DELETE") {
    const place = await Place.findByIdAndDelete(id);
    return response.status(200).json({ status: "Place successfully deleted." });
  }

  if (request.method === "PATCH") {
    const product = await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });
    return response.status(200).json({ status: "Place successfully updated." });
  }
  if (request.method === "GET") {
    const place = await Place.findById(id);
    return response.status(200).json(place);
  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}
