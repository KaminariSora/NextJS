import connectDB from "../../../libs/connectDB";
import ProductData from "../../../models/product";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();

    console.log("DB name:", mongoose.connection.name);
    console.log("Collection:", ProductData.collection.name);

    const count = await ProductData.countDocuments();
    console.log("Product count:", count);

    const products = await ProductData.find({});

    return Response.json({
      status: 200,
      success: true,
      data: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json(
      {
        status: 500,
        success: false,
        message: "Internal Server Error during data fetching",
      },
      { status: 500 }
    );
  }
}
