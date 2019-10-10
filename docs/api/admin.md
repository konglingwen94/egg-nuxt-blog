# 管理员接口

## 管理员登陆

`POST /admin/auth/login`

### Request

|  Field   |  Type  |  Description   |   Rules   |
| :------: | :----: | :------------: | :-------: |
| username | String |  管理员用户名  | length>=1 |
| password | String | 管理员登陆密码 | length>=6 |

### Response

`HTTP/1.1 200 OK`

```json
{
  "adminInfo": {
    "level": 100,
    "username": "root",
    "nickname": "孔令文",
    "role": "ROOT",
    "id": "5d92174caac6772ed606976d",
    "createdAt": "2019-09-30T14:55:08.542Z",
    "updatedAt": "2019-10-06T01:20:44.619Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6MTAwLCJ1c2VybmFtZSI6InJvb3QiLCJuaWNrbmFtZSI6IuWtlOS7pOaWhyIsInJvbGUiOiJST09UIiwiaWQiOiI1ZDkyMTc0Y2FhYzY3NzJlZDYwNjk3NmQiLCJjcmVhdGVkQXQiOiIyMDE5LTA5LTMwVDE0OjU1OjA4LjU0MloiLCJ1cGRhdGVkQXQiOiIyMDE5LTEwLTA2VDAxOjIwOjQ0LjYxOVoiLCJpYXQiOjE1NzA2OTkwMzEsImV4cCI6MTU3MTA1OTAzMX0.A04uGq-nJsbeDvHyxdStLDQMfY5c5V3MsMX7RbBmhiA"
}
```

## 修改账户信息

`PUT /admin/accounts/:id`

### Request

|  Field   |  Type  | Description | Required |
| :------: | :----: | :---------: | :------: |
| nickname | String |   新昵称    |   Yes    |

### Response

`HTTP/1.1 204 No Content`

## 管理员修改密码

`PUT /admin/accounts/:id/change-password`

### Required

|    Field    |  Type  | Description |   Rules   |
| :---------: | :----: | :---------: | :-------: |
| oldPassword | String |   原密码    | length>=6 |
| newPassword | String |   新密码    | length>=6 |

### Response

`HTTP/1.1 204 No Content`