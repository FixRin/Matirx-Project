import { proxy } from "valtio";
import ai from "../Assets/Images/ai.png";
import tshirt1 from "../Assets/Images/Ekran_görüntüsü_2025-01-25_200053-removebg-preview.png";
import tshirt2 from "../Assets/Images/Ekran_görüntüsü_2025-01-26_103224-removebg-preview.png";
import tshirt3 from "../Assets/Images/Ekran_görüntüsü_2025-01-26_105640-removebg-preview.png";
import tshirt4 from "../Assets/Images/Ekran_görüntüsü_2025-01-26_110222-removebg-preview.png";
import member1 from '../Assets/Images/Ekran görüntüsü 2025-02-08 185733.png'
const state = proxy({
  intro: true,
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: ai,
  fullDecal: ai,
});

export const product2 = [
  {
    name: "Classic Blue Denim Jacket",
    description:
      "A timeless blue denim jacket featuring a button-front closure and two chest pockets, perfect for casual wear.",
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    star: 4.5,
    price: 59.99,
  },
  {
    name: "Black Leather Biker Jacket",
    description:
      "A sleek black leather biker jacket with silver-tone hardware and asymmetrical zip closure.",
    imageUrl: "https://images.unsplash.com/photo-1514995669114-1e3a9d31a6d3",
    star: 4.8,
    price: 199.99,
  },
  {
    name: "White Cotton Crewneck T-Shirt",
    description:
      "A soft white cotton crewneck t-shirt, a versatile staple for any wardrobe.",
    imageUrl: "https://images.unsplash.com/photo-1585079541703-6e3e8b7980a1",
    star: 4.7,
    price: 19.99,
  },
  {
    name: "Slim Fit Chino Pants",
    description:
      "Slim fit chino pants in a versatile khaki color, featuring a mid-rise waist and tapered leg.",
    imageUrl: "https://images.unsplash.com/photo-1602810317005-6f8c1f1b9f8f",
    star: 4.6,
    price: 49.99,
  },
  {
    name: "Red Floral Print Sundress",
    description:
      "A breezy red sundress with a vibrant floral print, adjustable straps, and a smocked back.",
    imageUrl: "https://images.unsplash.com/photo-1585155774871-4f3b9f0f9b6a",
    star: 4.7,
    price: 39.99,
  },
  {
    name: "Navy Blue Blazer",
    description:
      "A tailored navy blue blazer with notch lapels and a single-button closure, ideal for formal occasions.",
    imageUrl: "https://images.unsplash.com/photo-1520975914655-6f28d7323c9e",
    star: 4.8,
    price: 129.99,
  },
  {
    name: "Striped Breton Long Sleeve Shirt",
    description:
      "A classic Breton striped shirt with long sleeves and a boat neckline, made from soft cotton.",
    imageUrl: "https://images.unsplash.com/photo-1585155774871-4f3b9f0f9b6a",
    star: 4.6,
    price: 34.99,
  },
  {
    name: "High-Waisted Skinny Jeans",
    description:
      "High-waisted skinny jeans in a dark wash, featuring a comfortable stretch fabric.",
    imageUrl: "https://images.unsplash.com/photo-1585155774871-4f3b9f0f9b6a",
    star: 4.7,
    price: 59.99,
  },
  {
    name: "Grey Cashmere Sweater",
    description:
      "A luxurious grey cashmere sweater with a crew neckline and ribbed cuffs.",
    imageUrl: "https://images.unsplash.com/photo-1585155774871-4f3b9f0f9b6a",
    star: 4.9,
    price: 149.99,
  },
  {
    name: "Black Pencil Skirt",
    description:
      "A classic black pencil skirt with a high waist and a back slit, perfect for office wear.",
    imageUrl: "https://images.unsplash.com/photo-1585155774871-4f3b9f0f9b6a",
    star: 4.6,
    price: 44.99,
  },
  {
    name: "Olive Green Utility Jacket",
    description:
      "An olive green utility jacket with multiple pockets and a drawstring waist for a customizable fit.",
    imageUrl: "https://images.unsplash.com/photo-1585155774871-4f3b9f0f9b6a",
    star: 4.5,
    price: 89.99,
  },
  {
    name: "White Eyelet Lace Blouse",
    description:
      "A feminine white blouse featuring eyelet lace detailing and puff sleeves.",
    imageUrl: "https://images.unsplash.com/photo-1585155774871-4f3b9f0f9b6a",
    star: 4.7,
    price: 49.99,
  },
  {
    name: "Black Ankle Boots",
    description:
      "Stylish black ankle boots with a stacked heel and side zipper closure.",
    imageUrl: "https://images.unsplash.com/photo-1585155774871-4f3b9f0f9b6a",
    star: 4.8,
    price: 99.99,
  },
  {
    name: "Camel Trench Coat",
    description:
      "A classic camel trench coat with a double-breasted design and waist belt.",
    imageUrl: "https://images.unsplash.com/photo-1585155774871-4f3b9f0f9b6a",
    star: 4.9,
    price: 149.99,
  },
  {
    name: "Blue Chambray Shirt",
    description:
      "A lightweight blue chambray shirt with button-down collar and chest pocket.",
    imageUrl: "https://images.unsplash.com/photo-1585155774871-4f3b9f0f9b6a",
    star: 4.6,
    price: 39.99,
  },
  {
    name: "Black Wrap Dress",
    description:
      "An elegant black wrap dress with a V-neckline and adjustable waist tie.",
    imageUrl: "https://images.unsplash.com/photo-1585155774871-4f3b9f0f9b6a",
    star: 4.8,
    price: 69.99,
  },
];

export const product = [
  {
    id: 1,
    title: "Git Hub",
    desc: "A high-quality cotton t-shirt with a modern design.",
    price: 59.99,
    img: tshirt1,
    star: 4.5,
  },
  {
    id: 2,
    title: "AC/DC",
    desc: "Comfortable hoodie with a bold graphic print.",
    price: 34.99,
    img: tshirt2,
    star: 4.7,
  },
  {
    id: 3,
    title: "Hope & Fear",
    desc: "Adjustable classic cap in multiple colors.",
    price: 14.99,
    img: tshirt3,
    star: 4.3,
  },
  {
    id: 4,
    title: "Mountains",
    desc: "Lightweight shorts suitable for running and workouts.",
    price: 24.99,
    img: tshirt4,
    star: 4.6,
  },
];

export const Team = [
  {
    id: 1,
    FullName: "Alex Thornfield",
   img: member1,
 
    
  },
  {
    id: 2,
    FullName: "Isabella Vance",
   img: member1,
 
    
  },
  {
    id: 3,
    FullName: "Damien Holloway",
   img: member1,
 
    
  },
  {
    id: 4,
    FullName: "Sophia Belmont",
   img: member1,
 
    
  },
];

export default state;