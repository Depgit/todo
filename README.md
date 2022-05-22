
<a href="https://firetododep.herokuapp.com/">demo of website</a>
# how to test from postman

POST request to  -> <b>/api/auth/signup<b>

```
{
    "firstName": "req.body",
    "lastName": "req.lastName",
    "mobile": "1231431231",
    "email": "6@6.com",
    "password": "1234",
    "confirmPassword": "1234"
}

```

<h2>response</h2>
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhhMTQxZjJjNWIyZmRhZTMxNWUzN2IiLCJpYXQiOjE2NTMyMTYyODd9.sLjxdjOjCneO2Lx0RddsSuwQS77of4b8rg07BhwqoAs",
    "user": {
        "firstName": "req.body",
        "lastName": "req.lastName",
        "mobile": "1231431231",
        "email": "6@6.com",
        "password": "1234",
        "confirmPassword": "1234",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhhMTQxZjJjNWIyZmRhZTMxNWUzN2IiLCJpYXQiOjE2NTMyMTYyODd9.sLjxdjOjCneO2Lx0RddsSuwQS77of4b8rg07BhwqoAs",
        "_id": "628a141f2c5b2fdae315e37b",
        "date": "2022-05-22T10:44:47.604Z",
        "__v": 0
    }
}

```
