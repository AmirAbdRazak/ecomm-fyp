import json
# from pprint import pprint

with open('./product_details.json', 'r') as f:
    prod_details = json.load(f)
    
new_prod = [prod for prod in prod_details if not prod['title'] == 'Does not exist']

with open('./product_details.json', 'w') as f:
    json.dump(new_prod, f)
    
print('Product details updated')