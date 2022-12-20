import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import FilterSideBar from '../components/layout/filterSideBar';

const Product = ({ product }: { product: recSysRes }) => {
    return (
        <Link
            href={'/products/' + product.id}
            className="group"
        >
            <div className="rounded-xl shadow-sm hover:shadow-xl">
                <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg p-2">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-40 w-full object-contain object-center group-hover:opacity-75"
                    />
                </div>
                <h3 className="mt-4 px-4 text-sm text-gray-700">
                    {product.name}
                </h3>
                <p className="mt-1 p-4 text-lg font-medium text-gray-900">
                    $
                    {product.price == 'Out of Stock' || product.price == '0.0'
                        ? '4.99'
                        : product.price}
                </p>
            </div>
        </Link>
    );
};

const ProductList = ({ products }: { products: recSysRes[] }) => {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((prod) => {
                        return (
                            <Product
                                key={prod.id}
                                product={prod}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const Products = () => {
    const [recProds, setRecs] = useState<recSysRes[]>([]);
    const [searchVal, setSearchVal] = useState('');
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(9999);

    useEffect(() => {
        fetch('/api/recSys', {
            headers: {
                'cache-control': 'max-age=60s',
            },
        })
            .then((res) => res.json())
            .then((data: recSysRes[]) => {
                setRecs(data);
            });
    }, []);

    return (
        <>
            <div className="flex-column flex">
                <FilterSideBar
                    searchFilter={[searchVal, setSearchVal]}
                    priceFilter={[minPrice, setMinPrice, maxPrice, setMaxPrice]}
                />
                <div>
                    <ProductList products={recProds} />
                </div>
            </div>
        </>
    );
};

export default Products;
