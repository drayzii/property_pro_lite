# Property Pro Lite

[![Build Status](https://travis-ci.org/drayzii/property_pro_lite.svg?branch=api)](https://travis-ci.org/drayzii/property_pro_lite)
[![Coverage Status](https://coveralls.io/repos/github/drayzii/property_pro_lite/badge.svg?branch=api)](https://coveralls.io/github/drayzii/property_pro_lite?branch=api)
[![Maintainability](https://api.codeclimate.com/v1/badges/79e2372a1d92dbcce647/maintainability)](https://codeclimate.com/github/drayzii/property_pro_lite/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/79e2372a1d92dbcce647/test_coverage)](https://codeclimate.com/github/drayzii/property_pro_lite/test_coverage)

This is a platform where people can create and/or search properties for sale or rent

---

## Cloning


```sh
git clone git@github.com:drayzii/property_pro_lite.git
```


## Installing Dependencies


```sh
npm install
```


## Usage

1. Creating an account: POST request
```sh
/auth/signup
```
2. Logging In: POST request
```sh
/auth/signin
```
3. Posting a property advert: POST request
```sh
/property
```
4. Updating a property advert: PATCH request
```sh
/property/<:id>
```
5. Deleting a property advert: DELETE request
```sh
/property/<:id>
```
6. Marking a property as Sold: POST request
```sh
/property/<:id>/sold
```
7. Flagging a property advert: PATCH request
```sh
/property/<:id>/flag
```
8. View a property advert: GET request
```sh
/property/<:id>
```
9. View all property adverts: GET request
```sh
/property
```
10. View property adverts by type: GET request
```sh
/property?type=<:type>
```


## Contributors

Jonathan Shyaka
