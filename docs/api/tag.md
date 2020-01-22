# 文章标签

## 获取标签列表

`GET /admin/tags`

`GET /tags`

### Response

`HTTP/1.1 200 OK`

```json
[
  {
    "name": "VueJs",
    "createdAt": "2019-10-03T07:16:48.824Z",
    "updatedAt": "2019-10-03T07:16:48.824Z",
    "id": "5d95a0600c64f55a9b6ca863",
    "articles": [{}],
    "articleCount": 2,
    "articlePublishedCount": 2
  }
]
```

## 添加标签

`POST /admin/tags`
 
### Request

| Field |  Type  | Description | Required |
| :---: | :----: | :---------: | :------: |
| name  | String |  标签名称   |   Yes    |
| cover | [File](./) |    封面     |   Yes    |

### Response

`HTTP/1.1 201 Created`

```json
{
  "name": "Nuxt.js",
  "id": "5d9d9ce3246364202c897068",
  "createdAt": "2019-10-09T08:40:03.313Z",
  "updatedAt": "2019-10-09T08:40:03.313Z",
  "articleCount": 0,
  "articlePublishedCount": 0
}
```

## 编辑标签

`PUT /admin/tags/:id`

### Request

| Field |  Type  | Description | Required |
| :---: | :----: | :---------: | :------: |
| name  | String |  标签名称   |   Yes    |

### Response

`HTTP/1.1 204 No Content`

## 删除标签

`DELETE /admin/tags/:id`

### Response

`HTTP/1.1 204 No Content`

