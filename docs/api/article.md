# 文章

## 获取文章列表

`GET /admin/articles`

`GET /articles`

### Response

```json
[
  {
    "tagIdList": ["5d95a0600c64f55a9b6ca863"],
    "content": {
      "html": "<div>html</div>",
      "text": "text"
    },
    "starCount": 3,
    "cover": {
      "name": "1570325210405.jpg",
      "path": "/uploads/1570325210405.jpg"
    },
    "pv": 28,
    "isPublished": true,
    "title": "起步",
    "categoryID": "5d92ab8c0c64f55a9b6ca85e",
    "createdAt": "2019-10-03T07:35:39.180Z",
    "updatedAt": "2019-10-08T06:42:29.794Z",
    "category": {
      "name": "前端开发",
      "createdAt": "2019-10-01T01:27:40.345Z",
      "updatedAt": "2019-10-01T01:27:40.345Z",
      "id": "5d92ab8c0c64f55a9b6ca85e"
    },
    "id": "5d95a4cb0c64f55a9b6ca869",
    "comments": [],
    "tagList": [
      {
        "name": "VueJs",
        "createdAt": "2019-10-03T07:16:48.824Z",
        "updatedAt": "2019-10-03T07:16:48.824Z",
        "id": "5d95a0600c64f55a9b6ca863"
      }
    ]
  }
]
```

## 添加文章

`POST /admin/articles`

### Request

|    Field    |              Type               |  Description   | Required |
| :---------: | :-----------------------------: | :------------: | :------: |
| categoryID  |            ObjectId             |   文章分类ID   |   Yes    |
|  tagIdList  |        Array\<ObjectId\>        | 文章标签ID列表 |    No    |
|    title    |             String              |    文章标题    |   Yes    |
|   content   | [Markdown](/database/#markdown) |    文章内容    |   Yes    |
|    cover    |     [File](/database/#file)     |    文章封面    |   Yes    |
| isPublished |             Boolean             |    是否发布    |   Yes    |

### Response
`HTTP1.1 201`

```json
{
  "starCount": 0,
  "tagIdList": [
    "5d95a09d0c64f55a9b6ca866"
  ],
  "isPublished": true,
  "pv": 0,
  "categoryID": "5d95a0570c64f55a9b6ca862",
  "title": "文章标题",
  "content": {
    "html": "<div>文章内容</div>",
    "text": "文章内容"
  },
  "cover": {
    "name": "",
    "path": ""
  },
  "id": "5d9d9182246364202c897066",
  "createdAt": "2019-10-09T07:51:30.590Z",
  "updatedAt": "2019-10-09T07:51:30.590Z"
}

```

## 编辑文章

`PUT /admin/articles/:id`

### Request

|    Field    |              Type               |  Description   | Required |
| :---------: | :-----------------------------: | :------------: | :------: |
| categoryID  |            ObjectId             |   文章分类ID   |    No    |
|  tagIdList  |        Array\<ObjectId\>        | 文章标签ID列表 |    No    |
|    title    |             String              |    文章标题    |    No    |
|   content   | [Markdown](/database/#markdown) |    文章内容    |    No    |
|    cover    |     [File](/database/#file)     |      封面      |    No    |
| isPublished |             Boolean             |    是否发布    |    No    |

### Response
`HTTP1.1 204 No Content`


## 删除文章

`DELETE /admin/articles/:id`

### Response

`HTTP1.1 204 No Content`

