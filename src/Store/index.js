import { proxy } from "valtio";
import slugify from "slugify";
import ai from "../Assets/Images/ai.png";
import tshirt1 from "../Assets/Images/Ekran_görüntüsü_2025-01-25_200053-removebg-preview.png";
import tshirt2 from "../Assets/Images/Ekran_görüntüsü_2025-01-26_103224-removebg-preview.png";
import tshirt3 from "../Assets/Images/Ekran_görüntüsü_2025-01-26_105640-removebg-preview.png";
import tshirt4 from "../Assets/Images/Ekran_görüntüsü_2025-01-26_110222-removebg-preview.png";
import member1 from "../Assets/Images/Ekran görüntüsü 2025-02-08 185733.png";

const state = proxy({
  intro: true,
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: ai,
  fullDecal: ai,
});

export const product = [
  {
    id: 1,
    img: tshirt1,
    desc: "A high-quality cotton t-shirt with a modern design.",
    star: 4.5,
    price: 59.99,
    title: "Git Hub",
  },
  {
    id: 2,
    img: tshirt2,
    desc: "Comfortable hoodie with a bold graphic print.",
    star: 4.7,
    price: 34.99,
    title: "AC/DC",
  },
  {
    id: 3,
    img: tshirt3,
    desc: "Adjustable classic cap in multiple colors.",
    star: 4.3,
    price: 14.99,
    title: "Hope & Fear",
  },
  {
    id: 4,
    img: tshirt4,
    desc: "Lightweight shorts suitable for running and workouts.",
    star: 4.6,
    price: 24.99,
    title: "Mountains",
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
