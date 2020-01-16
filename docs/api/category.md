# 文章分类

## 添加分类

`POST /admin/categories`

### Request

| Field |  Type  | Description | Required |
| :---: | :----: | :---------: | :------: |
| name  | String |  分类名称   |   Yes    |

### Response

`HTTP/1.1 201 Created`

```json
{
  "name": "移动端开发",
  "id": "5d9d9868246364202c897067",
  "createdAt": "2019-10-09T08:20:56.895Z",
  "updatedAt": "2019-10-09T08:20:56.895Z",
  "articleCount": 0,
  "articlePublishedCount": 0
}
```

## 编辑分类

`PUT /admin/categories/:id`

### Request

| Field |  Type  | Description | Required |
| :---: | :----: | :---------: | :------: |
| name  | String |  分类名称   |   Yes    |

### Response 

`HTTP1.1 204 No Content`

## 获取分类列表

`GET /admin/categories`  

`GET /categories`

### Response

`HTTP/1.1 200 OK`

```js
[
  {
    "name": "全栈开发",
    "createdAt": "2019-10-03T07:16:30.055Z",
    "updatedAt": "2019-10-03T07:16:30.055Z",
    "articles": [], //所包含的文章列表
    "id": "5d95a04e0c64f55a9b6ca861",
    "articleCount": 0,  文章个数
    "articlePublishedCount": 0  //已发布文章个数
  },
]
```

## 删除分类

`DELETE /admin/categories/:id`

### Response

`HTTP/1.1 204 No Content`

