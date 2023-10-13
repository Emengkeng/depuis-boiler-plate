# Best E-wallet-virtual-card-system
This system allow users to fund their account, transfer funds and withdraw from their account, and also subscribe to virtual credit card

# Note
Application is still under developement, new features may be added weekly 

# Features
- Basic Authentication (Register & Login)
- Get Profile
- Set Wallet Pin
- Fund Wallet
- Verify Wallet Funding
- Fund Transfer
- Withdraw Fund
- Get Transactions
- Create to card
- Freeze card
- Fund Card
- Get Card Transactions
- Withdraw from card

# Tech Stack
- javascript
- nodejs
- mysql
- express

# Todo
[ ] Switch from using axios in the deposit and withdrawal, to using flutterwave rave package

[ ] 
# API End Points
## Users
### Register
```
{BaseUrl}/api/v1/register
```
This endpoint does the followings:

- Create a user
- Create a wallet for the user


### Login
```
{BaseUrl}/api/v1/login
```
This endpoint does the followings
- Check if the user details is valid
- Generate a JWT token if the user details are valid

### Get Profile
```
{BaseUrl}/api/v1/auth/profile
```
- This endpoint return the profile of the authenticated user.

### All Users
```
{BaseUrl}/api/v1/getallusers
```
- This endpoint return all registered users 

## Wallet
### Set Wallet Pin
```
{BaseUrl}/api/v1/wallet/set-pin
```
- Set wallet pin for the user because by default the wallet created during registration is null

### Fund Wallet
```
{BaseUrl}/api/v1/wallet/fund
```
- Takes amount and generate payment link

### Verify Wallet funding 
```
{BaseUrl}/api/v1/wallet/verify
```
- Takes Payment Link and verifies it

### Transfer Money 
```
{BaseUrl}/api/v1/wallet/transfer
```
- Transfers money from one account to another 

### Withdraw money
```
{BaseUrl}/api/v1/wallet/withdraw
```
- Checks account balance and Withdraw money from users account


### Get Wallet Balance
```
{BaseUrl}/api/v1/wallet/balance
```
- Get users account balance

### Banks
```
{BaseUrl}/api/v1/wallet/banks
```
- Get all available banks used by flutterwave

## Transaction 
### Get Wallet Transactions
```
{BaseUrl}/api/v1/transactions
```
- Get Users transactions 

## Card
### List Cards
```
{BaseUrl}/api/v1/card/listcard
```
- List all Cards that have been created since the existence of the plartform

### Create Card
```
{BaseUrl}/api/v1/card/createcard
```
- Create a card for a user, depending on the card type

### Fund Card
```
{BaseUrl}/api/v1/card/fundcard
```
- Takes amount and funds a card

### Pay
```
{BaseUrl}/api/v1/card/pay
```
- End point to test if a card works by initiating payment with it

### Get Card
```
{BaseUrl}/api/v1/card/getcard
```
- Takes card id and return all info about that card 

### Fetch Transaction of a card 
```
{BaseUrl}/api/v1/card/fetch_transcard
```
- Fetch transactions of a card from the flutterwave server
- We will add a card transaction table on our db to handle this soon


### Withdraw 
```
{BaseUrl}/api/v1/card/withdraw
```
- Withdraw money from card


### Freeze Card
```
{BaseUrl}/api/v1/card/freezecard
```
- Takes card id and Freeze the card

### Gift Card
```
{BaseUrl}/api/v1/card/giftcard
```
- Gift a card to a user on the plartform 

### Accept a Gifted Card
```
{BaseUrl}/api/v1/card/acceptcard
```
- Accept card that has been gifted to you

# How to install

## Using Git (recommended)
1. Clone the project from github.

```
git clone https://github.com/Emengkeng/virtual-card-and-e-wallet.git
```
git remote add origin https://github.com/Emengkeng/virtual-card-and-e-wallet.git
## Using manual download ZIP

1. Download repository
2. Uncompress to your desired directory

## Install npm dependencies

```
npm install
```

## Setting up environments
1. You will find a file named `.env.example` on root directory of project.
2. Create a new file by copying and pasting the file and then renaming it to just `.env`

```
cp .env.example .env
```
3. The file `.env` is already ignored, so you never commit your credentials.
4. Change the values of the file to your environment. Helpful comments added to `.env.example` file to understand the constants.

## Running and resetting migrations

1. To run migrations
```
npm run migrate
```
2. To reset migrations
```
npm run migrate:reset
```

# How to run

## Running API server locally
```
npm run dev
```
You will know server is running by checking the output of the command `npm start`



# Running Tests
```
npm test
```
**Note:** Make sure you set up the test variable in the `.env` file

# Author
Emenkeng Juslen

# License
MIT
