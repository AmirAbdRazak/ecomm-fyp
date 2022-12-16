from bs4 import BeautifulSoup
import requests
from time import sleep
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0',
    'Accept-Language': 'en-US,en;q=0.9'
}

with open('product_names.txt', 'r') as f:
    product_names = f.readlines()
    
product_asin = [prod_name.strip('\n') for prod_name in product_names]

products = []

count = 0
total = len(product_asin)

for asin in product_asin:
    
    count += 1
    
    main_URL = f"https://www.amazon.com/dp/{asin}"
    r = requests.get(main_URL, headers=headers)

    soup = BeautifulSoup(r.content, "lxml")
    result = soup.find('div', attrs={'class': 's-main-slot s-result-list s-search-results sg-row'})
    
    try:
        img_link = soup.select_one('img.a-dynamic-image[src]')['src']
    except:
        img_link = 'Does not exist'
    
    try:
        title = soup.select_one('span.product-title-word-break#productTitle').text.strip()
    except:
        title = 'Does not exist'
    
    try:
        productPrice = soup.select_one('input#attach-base-product-price')['value']
    except:
        productPrice = "Out of Stock"

    product_dict = {
        'asin': asin,
        'url': img_link,
        'title': title,
        'price': productPrice
    }

    products.append(product_dict)
    
    print(f'Successfully retrieved product details for {asin} ({count} out of {total})')
    sleep(1)
    

print ('Operation Completed, Retrieved all needed data from Amazon')
with open('product_details.json', 'w') as f:
    json.dump(products, f)