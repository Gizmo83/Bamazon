# Bamazon - Node.js & MySQL App

## Description

Bamazon is a CLI storefront created with Node.js and MySQL.  The application consists of three interfaces to accomplish different tasks.

### #1 - Bamazon-Customer

bamazonCustomer.js pulls a products table from a MySQL database and displays all the product available to a customer.  The customer can select an item and enter the quantity they want to purchase.  The application will check the inventory, if sufficient, it will place the order and deduct the quantity from inventory and return the order total.  If not sufficient, it will return "Sorry - Insufficient quantity!".

 * Step 1: Start Screen - Displays all items available
 
 ![](images/customer1.JPG)

 * Step 2: Once item has been selected, it will prompt for quantity
 
 ![](images/customer2.JPG)

 * Step 3: If quantity is sufficient, order is placed and shows the total
 
 ![](images/customer3.JPG)

 * Step 4: If insufficient, it will prompt insufficient and ask the customer if they want to make another purchase
 
 ![](images/customer6.JPG)

 * Step 5: Make another purchase?
 
 ![](images/customer4.JPG)

 * Step 6: Exit
 
 ![](images/customer5.JPG)


#### How To Run

    * node.js bamazonCustomer.js
