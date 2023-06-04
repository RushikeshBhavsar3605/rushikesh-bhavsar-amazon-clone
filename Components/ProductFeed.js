import { useSelector } from "react-redux";
import Product from "./Product";
import { searchString } from "@/slices/basketSlice";
import Image from "next/image";
import primeday1 from "../public/primeday1.jpg";
import primeday2 from "../public/primeday2.gif";

function ProductFeed({ products }) {
  const search = useSelector(searchString);

  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products
        .slice(0, 4)
        .map(({ id, title, price, description, category, image }) => {
          if (search && !title.toLowerCase().includes(search.toLowerCase()))
            return null;
          return (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          );
        })}

      <Image className="md:col-span-full" src={primeday1} alt="" />

      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, price, description, category, image }) => {
            if (search && !title.toLowerCase().includes(search.toLowerCase()))
              return null;
            return (
              <Product
                key={id}
                id={id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
              />
            );
          })}
      </div>

      {products
        .slice(5, 23)
        .map(({ id, title, price, description, category, image }) => {
          if (search && !title.toLowerCase().includes(search.toLowerCase()))
            return null;
          return (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          );
        })}

      <div className="md:col-span-2">
        {products
          .slice(23, 24)
          .map(({ id, title, price, description, category, image }) => {
            if (search && !title.toLowerCase().includes(search.toLowerCase()))
              return null;
            return (
              <Product
                key={id}
                id={id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
              />
            );
          })}
      </div>

      <Image className="md:col-span-full" src={primeday2} alt="" />

      {products
        .slice(25, products.length)
        .map(({ id, title, price, description, category, image }) => {
          if (search && !title.toLowerCase().includes(search.toLowerCase()))
            return null;
          return (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          );
        })}

      <div className="md:col-span-4">
        {products
          .slice(24, 25)
          .map(({ id, title, price, description, category, image }) => {
            if (search && !title.toLowerCase().includes(search.toLowerCase()))
              return null;
            return (
              <Product
                key={id}
                id={id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ProductFeed;
