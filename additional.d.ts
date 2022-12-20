type product = {
    seller_id: string;
    category: string;
    id: string;
    image_url: string;
    name: string;
    price: string;
};

type recSysRes = {
    id: string;
    name: string;
    image_url: string;
    price: string;
};

type searchFilterType = [string, Dispatch<SetStateAction<string>>];
type priceFilterType = [
    number,
    Dispatch<SetStateAction<number>>,
    number,
    Dispatch<SetStateAction<number>>
];
