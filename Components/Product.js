import { addToBasket } from "@/slices/basketSlice";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import primeLogo from "../public/primeLogo.png";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
  const dispatch = useDispatch();

  const [rating, setRating] = useState();
  const [hasPrime, setHasPrime] = useState(false);

  useEffect(() => {
    const rating =
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING;
    const hasPrime = Math.random() < 0.5;

    setRating(rating);
    setHasPrime(hasPrime);
  }, []);

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };
    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <div className="flex items-center justify-center">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

      <h4 className="my-3">{title}</h4>

      {/* Error State */}
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency="INR" />
      </div>

      {/* Error State */}
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <Image className="w-12" src={primeLogo} alt="Prime Logo" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button
        onClick={addItemToBasket}
        className="mt-auto p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border border-yellow-300 rounded-sm focus:outline-none focus:ring-2 focus-yellow-500 active:from-yellow-500"
      >
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
