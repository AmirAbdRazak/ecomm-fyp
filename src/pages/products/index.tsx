import React from 'react'

const Product = ({ title }: { title: string }) => {
  return (

    <a href="#" className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <img src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
          alt="Tall slender porcelain bottle with nattaiural clay textured body and cork stopper."
          className="h-full w-full object-cover object-center group-hover:opacity-75" />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">$48</p>
    </a>

  )

}

const ProductList = () => {
  const temp = ["waw", "wpa", "woa", "wawaw"]

  return (

    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

          {
            temp.map(title => <Product title={title} />)
          }

        </div>
      </div>
    </div>
  )
}
const Products = () => {
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
          <ProductList />
        </div>
      </div>
    </>
  )
}
export default Products