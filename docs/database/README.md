# 数据库表结构设计文档

## 通用字段

|   Field   |  Type  |   Description    |
| :-------: | :----: | :--------------: |
|    id     | String |       主键       |
| createdAt |  Date  |   数据创建时间   |
| updatedAt |  Date  | 数据最后更新时间 |

## 通用类型

### ObjectId

[MongoDB 主键类型](https://docs.mongodb.com/manual/reference/method/ObjectId/)，24 位的字符串。

### File

文件类型，格式如下：

| Field |  Type  | Description  |
| :---: | :----: | :----------: |
| name  | String |    文件名    |
| path  | String | 文件存储路径 |

```json
{
  "name": "文件名.jpg",
  "path": "/uploads/文件名.jpg"
}
```

### Markdown

Markdown 编辑器输出内容类型，格式如下：

| Field |  Type  |          Description           |
| :---: | :----: | :----------------------------: |
| html  | String | 带有 HTML 片段的 Markdown 内容 |
| text  | String |          纯文本的内容          |

```json
{
  "html": "<div>Content</div>",
  "text": "text"
}
```
