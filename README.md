# Bamazon - Node.js & MySQL App

## Description

Bamazon is a CLI storefront created with Node.js and MySQL.  The application consists of three interfaces to accomplish different tasks.

### #1 - Bamazon-Customer

bamazonCustomer.js pulls a products table from a MySQL database and displays all the product available to a customer.  The customer can select an item and enter the quantity they want to purchase.  The application will check the inventory, if sufficient, it will place the order and deduct the quantity from inventory and return the order total.  If not sufficient, it will return "Sorry - Insufficient quantity!".

#### How To Run

* node.js bamazonCustomer.js

* Step 1: Start Screen - Displays all items available
![](images/customer1.JPG)

* Step 2: Once item has been selected, it will prompt for quantity
![](images/customer2.JPG)

* Step 3: If quantity is sufficient, order is placed and shows the total.
![](images/customer3.JPG)

* Step 4: If insufficient, it will prompt insufficient and ask the customer if they want to make another purchse
![](images/customer6.JPG)

* Step 5: Make another purchase?
![](images/customer4.JPG)

* Step 6: Exit
![](images/customer5.JPG)


### #2 - Bamazon-Manager Console

bamazonManager.js lets you: 
* View Products for Sale
* View Low Inventory (Set to <5)
* Add to Inventory
* Add New Product

#### How To Run

* node.js bamazonManager.js

* Step 1: Start Screen - Choose an option

![](images/manager1.JPG)

* Step 2: View Products for Sale

![](images/manager2.JPG)

* Step 3: View Low Inventory (displays any items that have an inventory of <5)

![](images/manager3.JPG)

* Step 4: Add to inventory
    * Select item from list
    * Enter quantity to be added
    * Confirmation

![](images/manager4.JPG)

* Step 5: Add New Product
    * Eneter Product Name
    * Enter Department
    * Enter Price
    * Enter Quantity

![](images/manager5.JPG)


### #2 - Bamazon-Manager Console

bamazonSupervisor.js lets you:
* View Product Sales by Department
* Create a New Department

#### How To Run

* node.js bamazonManager.js

* Step 1: Start Screen - Choose an option

![](images/supervisor1.JPG)

* Step 2: View Product Sales by Deparment

![](images/supervisor2.JPG)

* Step 3: Create a New Department
    * Enter Department Name
    * Enter Over Head Costs
    * Confirmation

![](images/supervisor3.JPG)
