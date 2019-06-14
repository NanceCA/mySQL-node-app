# mySQL-node-app

May 2019

## About the mySQL Node App

The following CLI application let's users browse retail inventory and select a quantity of units to purchase.

The app deploys in the Node.js environment. Output is viewed on the command prompt/ command line/ PowerShell etc.,

## Running the Application

It is not necessary to run the application with argv.params. The application uses npm's inquirer to walk the user through the functionality. The inquirer commands prompt the following:

**id of the product of interest**

**number of units to purchase**
 
Upon receiving user input on product id and the number of units, the application confirms the product name with the user and confirms with the database that there is sufficient inventory. If there is insufficient inventory, the user is informed and prompted on selecting a different product, if desired. After every product submission, the user is prompted to determine whether or not they'd like to submit an additional order.

```
node bamazonCustomer.js
```

## Screenshots of the terminal / bash window output

###### Functional output


###### Application displaying all items in inventory
![FirstScreenshot](/1.PNG)

###### Output with input from user and order processing, price for order included

![SecondScreenshot](/2.PNG)

###### Output for when user decides to place a second order, database updated
![ThirdScreenshot](/3.PNG)

###### Output for when user decides they no longer want to place additional orders
![FourthScreenshot](/4.PNG)
