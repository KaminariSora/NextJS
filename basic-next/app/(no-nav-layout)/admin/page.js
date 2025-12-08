"use client"

import { useState } from 'react';
import './admin.css'

const Admin = () => {
    const [nameValue, setNameValue] = useState("")
    const [priceValue, setPriceValue] = useState()
    const [descriptionValue, setDescriptionValue] = useState("")
    const [stockValue, setStockValue] = useState()
    const [imageValue, setImageValue] = useState("")
    const [genreValue, setGenreValue] = useState("Realistic/Figurative")

    const handleNameChange = (e) => {
        setNameValue(e.target.value)
    }
    const handlePriceChange = (e) => {
        setPriceValue(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescriptionValue(e.target.value)
    }
    const handleStockChange = (e) => {
        setStockValue(e.target.value)
    }
    const handleImageLinkChange = (e) => {
        setImageValue(e.target.value)
    }

    const handleGenreChange = (e) => {
        setGenreValue(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newproduct = makingJson(nameValue, priceValue, descriptionValue, stockValue, imageValue, genreValue)
        console.log(newproduct)
        const productData = {
            name: nameValue,
            price: parseFloat(priceValue),
            description: descriptionValue,
            stock: parseInt(stockValue, 10),
            image: imageValue,
            genre: genreValue
        };

        try {
            const response = await fetch('http://localhost:3000/product/insertData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            const result = await response.json();

            if (response.ok) {
                console.log("ส่งข้อมูลสำเร็จ! (Status: 200)", result);
                alert(`สินค้าถูกบันทึก`);
            } else {
                console.error("Server Error:", result);
                alert(`ข้อผิดพลาดจาก Server: ${result.message}`);
            }

        } catch (err) {
            console.error("Network/Proxy Error:", err);
            alert("ไม่สามารถเชื่อมต่อ Server ได้ โปรดตรวจสอบว่า Express Server รันอยู่");
        }
    }

    const makingJson = (name, price, description, stock, image, genre) => {
        const productData = {
            name,
            price,
            description,
            stock,
            image,
            genre
        }
        return productData
    }

    return (
        <div className='admin-container'>
            <form onSubmit={handleSubmit}>
                <h1>Admin page</h1>
                <div className='admin-inputbox'>
                    <label>Name</label>
                    <input type='text' value={nameValue} onChange={handleNameChange} required></input>
                </div>
                <div className='admin-inputbox'>
                    <label>Price</label>
                    <input type='number' value={priceValue} onChange={handlePriceChange} required></input>
                </div>
                <div className='admin-inputbox'>
                    <label>Description</label>
                    <input type='text' value={descriptionValue} onChange={handleDescriptionChange} required></input>
                </div>
                <div className='admin-inputbox'>
                    <label>Stock</label>
                    <input type='number' value={stockValue} onChange={handleStockChange} required></input>
                </div>
                <div className='admin-inputbox'>
                    <label>Image link</label>
                    <input type='text' value={imageValue} onChange={handleImageLinkChange} required></input>
                </div>
                <div className='admin-inputbox'>
                    <label>Genre/Image Type</label>
                    <select
                        value={genreValue}
                        onChange={handleGenreChange}
                        required>
                        <option value="Realistic/Figurative">Realistic / Figurative</option>
                        <option value="Portrait">Portrait</option>
                        <option value="Still Life">Still Life</option>
                        <option value="Landscape/Cityscape">Landscape / Cityscape</option>
                        <option value="Abstract">Abstract</option>
                        <option value="Anime/Manga Style">Anime/Manga Style</option>
                        <option value="Cartoon/Comic Style">Cartoon/Comic Style</option>
                        <option value="Impressionism">Impressionism</option>
                    </select>
                </div>
                <button type='submit'>Submit button</button>
            </form>
        </div>
    );
}

export default Admin