# Best E-wallet-virtual-card-system
This system allow users to fund their account, transfer funds and withdraw from their account, and also subscribe to Real virtual credit card

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

# API End Points
## Users
### Register
```
{BaseUrl}/api/v1/register
```
This endpoint does the followings:

- Create a user
- Sends Verification To the New User

### Login
```
{BaseUrl}/api/v1/login
```
This endpoint does the following
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
```sh
sh dev-sript.sh
```
You will know server is running by checking the output of the command `npm start`

## Running API server on The Web
```sh
sh production-sript.sh
```


# Running Tests
```
npm test
```
**Note:** Make sure you set up the test variable in the `.env` file

# Author
Emenkeng Juslen

# License
MIT
