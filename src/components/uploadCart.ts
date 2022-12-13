import { Dispatch, SetStateAction } from 'react';

const uploadCart = (
    item_id: string,
    seller_id: string,
    setRender: Dispatch<SetStateAction<boolean>>
) => {
    const obj = {
        item_id: item_id,
        seller_id: seller_id,
    };

    fetch('/api/manageCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    }).then(() => {
        setRender(true);
    });
};

export default uploadCart;
