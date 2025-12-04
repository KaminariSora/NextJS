import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        trim: true, 
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    
    price: {
        type: Number,
        required: true, 
        min: [0, 'Price cannot be negative']
    },
    
    description: {
        type: String,
        required: true,
    },
    
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Stock cannot be negative']
    },

    image: {
        type: String,
        required: true
    },
    
    product_embedding: {
        type: [Number], 
        required: false,
        validate: {
            validator: (v) => v.length === 1024,
            message: 'Embedding must be an array of size 1024'
        }
    }
}, { 
    timestamps: true,
    collection: 'Product'
});

const ProductData = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default ProductData;