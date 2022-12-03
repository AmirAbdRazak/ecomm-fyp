import React from 'react'
import { prisma } from "../../server/db/client";

const Product = ({ product }: { product: product }) => {
  return (

    <a href="#" className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <img src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75" />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
    </a>

  )

}

const ProductList = ({ products }: { products: product[] }) => {

  return (

    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

          {
            products.map(prod => {
              if (prod.price != "Out of Stock" && prod.price != "0.0") {
                return (
                  <Product
                    key={prod.id}
                    product={prod}
                  />
                )
              }
            }
            )
          }

        </div>
      </div>
    </div>
  )
}

type product = {
  "seller_id": string,
  "category": string,
  "id": string,
  "image_url": string,
  "name": string,
  "price": string
}

const Products = ({ products }: { products: product[] }) => {
  const categories = ["Phone", "Tablets", "Desktops", "Laptops", "Accessories", "Tools", "Others"];
  return (
    <>
      <div className="flex flex-column">
        <div className="pt-20 pl-10 w-56 z-0">
          {
            categories.map(category => {
              return (<div className="flex flex-row justify-between py-2">
                <div className="text-md">
                  {category}
                </div>
                <div>
                  <input type="checkbox" className="checkbox justify-end" />
                </div>
              </div>)
            })
          }
        </div>
        <div>
          <ProductList
            products={products}
          />
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const products = await prisma.item.findMany();

  return {
    props: {
      products,
    },
    revalidate: 120, // In seconds
  }
}

export default Products