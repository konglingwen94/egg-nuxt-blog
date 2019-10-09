# 留言墙

## 获取留言列表

`GET /admin/guestbooks`

`GET /guestbooks`

### Response

`HTTP/1.1 200 OK`

```json
[
  {
    "content": "这个博客看着还不错",
    "diggCount": 0,
    "nickname": "孔令文",
    "dialogues": [
      {
        "nickname": "博主",
        "content": "感谢您的回复",
        "diggCount": 1,
        "responseTo": "5d95c33d0c64f55a9b6ca871",
        "createdAt": "2019-10-06T01:25:06.700Z",
        "updatedAt": "2019-10-06T05:29:57.271Z",
        "responseToUser": {
          "nickname": "一首简单的歌",
          "content": "同意楼上",
          "diggCount": 1,
          "responseTo": "5d95b4dd0c64f55a9b6ca870",
          "createdAt": "2019-10-03T09:45:33.291Z",
          "updatedAt": "2019-10-05T03:20:13.386Z",
          "responseToUser": {
            "nickname": "沛文",
            "content": "楼主说的对",
            "diggCount": 6,
            "responseTo": "5d95b4ad0c64f55a9b6ca86f",
            "createdAt": "2019-10-03T08:44:13.589Z",
            "updatedAt": "2019-10-05T03:20:14.602Z",
            "id": "5d95b4dd0c64f55a9b6ca870"
          },
          "id": "5d95c33d0c64f55a9b6ca871"
        },
        "id": "5d994272c8fb3279897b872e"
      }
    ],
    "createdAt": "2019-10-03T08:43:25.242Z",
    "updatedAt": "2019-10-06T05:29:57.271Z",
    "id": "5d95b4ad0c64f55a9b6ca86f"
  }
]
```


## 发表留言

`POST /guestbooks`

### Request

|  Field   |  Type  | Description  | Required |
| :------: | :----: | :----------: | :------: |
| content  | String |   留言内容   |   Yes    |
| nickname | String | 留言用户昵称 |   Yes    |

### Response

`HTTP/1.1 201 Created`

```json
{
  "content": "这是一个留言·",
  "diggCount": 0,
  "nickname": "昵称",
  "dialogues": [],
  "id": "5d9da6372b10e12008294ca1",
  "createdAt": "2019-10-09T09:19:51.354Z",
  "updatedAt": "2019-10-09T09:19:51.354Z"
}
```

## 回复留言

`POST /guestbooks/:id/dialogues`

### Request

|   Field    |   Type   | Description  | Required |
| :--------: | :------: | :----------: | :------: |
|  content   |  String  | 回复留言内容 |   Yes    |
|  nickname  |  String  | 回复用户昵称 |   Yes    |
| responseTo | ObjectId |  回复用户ID  |   Yes    |

### Response

`HTTP/1.1 200 OK`

```json
{
  "content": "这是一个留言·",
  "diggCount": 0,
  "nickname": "昵称",
  "dialogues": [
    {
      "nickname": "昵称",
      "content": "这是一条回复·",
      "diggCount": 0,
      "responseTo": "5d9da6372b10e12008294ca1",
      "createdAt": "2019-10-09T09:20:59.884Z",
      "updatedAt": "2019-10-09T09:20:59.884Z",
      "id": "5d9da67b2b10e12008294ca2"
    }
  ],
  "id": "5d9da6372b10e12008294ca1",
  "createdAt": "2019-10-09T09:19:51.354Z",
  "updatedAt": "2019-10-09T09:20:59.884Z"
}
```

## 点赞回复

`PATCH /guestbooks/:id/dialogues/:responseID/digg`

### Response

`HTTP/1.1 204 No Content`


## 删除留言

`DELETE /admin/guestbooks/:id`

### Respnose

`HTTP/1.1 204 No Content`


## 删除留言回复

`DELETE /admin/guestbooks/:id/dialogues/:responseID`

### Response

`HTTP/1.1 204 No Content`

## 删除多个留言回复

`DELETE /admin/guestbooks/:id/dialogues`

### Request 

| Field  |       Type        |  Description   | Required |
| :----: | :---------------: | :------------: | :------: |
| idList | Array\<ObjectId\> | 留言回复ID列表 |   Yes    |

### Response

`HTTP/1.1 204 No Content`

