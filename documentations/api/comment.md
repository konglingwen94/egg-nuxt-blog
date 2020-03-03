# 文章评论

## 发表评论

`POST /articles/:id/comments`

### Request

|  Field   |  Type  | Description  | Required |
| :------: | :----: | :----------: | :------: |
| content  | String |   评论内容   |   Yes    |
| nickname | String | 评论用户昵称 |   Yes    |

### Response

`HTTP/1.1 201 Created`

```json
{
  "content": "这是一个评论",
  "nickname": "昵称1",
  "thumbupCount": 0,
  "id": "5d9d9e3a246364202c897069",
  "createdAt": "2019-10-09T08:45:46.228Z",
  "updatedAt": "2019-10-09T08:45:46.228Z"
}
```

## 获取全部评论列表

`GET /admin/comments`

### Response

`HTTP/1.1 200 OK`

```json
[
  {
    "content": "这是一个评论",
    "nickname": "昵称1",
    "thumbupCount": 0,
    "createdAt": "2019-10-09T08:45:46.228Z",
    "updatedAt": "2019-10-09T08:45:46.228Z",
    "id": "5d9d9e3a246364202c897069",
    "articleTitle": "起步" // 文章标题
  }
]
```

## 删除评论

`DELETE /admin/comments/:id`

### Response

`HTTP/1.1 204 No Content`


## 评论点赞

`PATCH /comments/:id/thumbup`

### Response

`HTTP/1.1 204 No Content`