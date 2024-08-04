#! /usr/bin/env node
import inquirer from "inquirer"

//Bank Account interface
interface BankAccount{
    accountNumber: number;
    balance : number;
    withdraw(amount : number) : void
    deposit(amount : number) : void
    checkBalance() : void
}

//Bank Account class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }

//Debit money 
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(`Withdrawal of $${amount} sucessful. Remaining Balance: $${this.balance}`);
    } else {
        console.log("Balance insufficient.");  
    }
}

//Credit Money 
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1;
    }this.balance += amount;
    console.log(`deposit of $${amount} successful. Updated Balance: $${this.balance}`);
}

//Check Balance
checkBalance(): void {
    console.log(`Current Balance $${this.balance}`);
}
}

//create customer class
class Customer{
    firstName: string; 
    lastName : string;
    gender : string;
    age : number;
    mobileNo : number;
    account : BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age:number, mobileNo:number, account : BankAccount){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNo = mobileNo;
        this.account = account;
    }
}

//Creating class objects
const accounts : BankAccount[] = [ 
    new BankAccount (1001, 500),
    new BankAccount (2011, 1000),
    new BankAccount (5002, 2000),
]

//Creating customers
const customers : Customer[] = [
    new Customer("Mehak", "Faheem", "Female", 19, 3152968004, accounts[0]),
    new Customer("Ayat", "Khan", "Female", 18, 313244456, accounts[1]),
    new Customer("Adam", "Al Kurdiya", "Male", 22, 3125678943, accounts[2])
]

//function to interact with bank account

async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number: "
        })
        const customer = customers.find(customer  => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([
                {
                    name: "Select", 
                    type: "list",
                    message: "What would you like to do?",
                    choices: ["Check Balance", "Deposit Money", "Withdraw Money", "Exit"]
                }]);

                switch(ans.Select){
                case "Check Balance" : 
                    customer.account.checkBalance();
                    break;
                case "Deposit Money": 
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount you want to deposit: "
                    })
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw Money": 
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount you want to withdraw: "
                    })
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Exit":
                    console.log("Exiting the program....");
                    console.log("Thank you for visiting. Have a nice day.");
                    return;   
                } 
        }else {
            console.log("Invalid account number. Please try again."); 
        }
    } while(true)
}

service();