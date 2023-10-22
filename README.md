# Depuis - Nodejs Boiler Plate 🌟

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![Code Size][gitHub-code-size-in-bytes]][gitHub-url] -->


Awesome Nodejs Boiler Plate with Basic Authentication (Register, Login, Reset Password, Forget Password)


# Features
- Basic Authentication (Register, Login, Reset Password, Forget Password)
- Get Profile

## Tech stack
- javascript
- nodejs
- mysql
- express


## Instructions

## Using Git (recommended)
1. `git clone https://github.com/Emengkeng/depuis-boiler-plate.git` 
2. `cd depuis-boiler-plate`
3. Install node dependencies 
   - `npm install`

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

## Running API server Live
```sh
sh production-sript.sh
```


# Running Tests
```
npm test
```
**Note:** Make sure you set up the test variable in the `.env` file



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

### Forget Password
```
{BaseUrl/api/v1/forgetpassword}
```
This endpoint does the following
- Takes Email and Send and Send a reset link to change password

### Reset Passoword 
```
{BaseUrl}/api/v1/resetpassword
```
This endpoint does the following
- Creates a new Password for user

### Change Password
```
{BaseUrl}/api/v1/changepassword
```
This endpoint does the following
- Takes a new password and Replace the old one

### Confirm Email
```
{BaseUrl}/api/v1/confirmemail
```
This endpoint does the following
- Confirm the email of the user


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
## Need help?

Feel free to contact me on [![LinkedIn][linkedin-shield]][linkedin-url]

 [![Twitter](https://img.shields.io/badge/Twitter-follow-blue.svg?logo=twitter&logoColor=white)](https://twitter.com/OxJussec)

---------

```javascript

if (youEnjoyed) {
    starThisRepository();
}

```

-----------


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Emengkeng/depuis-boiler-plate.svg?style=for-the-badge
[contributors-url]: https://github.com/Emengkeng/depuis-boiler-plate/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Emengkeng/depuis-boiler-plate.svg?style=for-the-badge
[forks-url]: https://github.com/Emengkeng/depuis-boiler-plate/network/members
[stars-shield]: https://img.shields.io/github/stars/Emengkeng/depuis-boiler-plate.svg?style=for-the-badge
[stars-url]: https://github.com/Emengkeng/depuis-boiler-plate/stargazers
[issues-shield]: https://img.shields.io/github/issues/Emengkeng/depuis-boiler-plate.svg?style=for-the-badge
[issues-url]: https://github.com/Emengkeng/depuis-boiler-plate/issues
[license-shield]: https://img.shields.io/github/license/Emengkeng/depuis-boiler-plate.svg?style=for-the-badge
[license-url]: https://github.com/Emengkeng/depuis-boiler-plate/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/jussec
[gitHub-code-size-in-bytes]: https://img.shields.io/github/languages/code-size/Emengkeng/depuis-boiler-plate.svg?logo=github&style=for-the-badge
[gitHub-url]: https://github.com/Emengkeng/depuis-boiler-plate
[gitHub-last-commit]: https://img.shields.io/github/last-commit/Emengkeng/depuis-boiler-plate.svg?style=for-the-badge&logo=git
[gitHub last commit url]: 