# 文章

> Model名称： Article

|    Field    |              Type               |  Description   |
| :---------: | :-----------------------------: | :------------: |
| categoryID  |            ObjectId             |   文章分类ID   |
|  tagIdList  |        Array\<ObjectId\>        | 文章标签ID列表 |
|    title    |             String              |    文章标题    |
|   content   | [Markdown](/database/#markdown) |    文章内容    |
|    cover    |     [File](/database/#file)     |    文章封面    |
| isPublished |             Boolean             |    是否发布    |
|     pv      |             Number              |   文章访问量   |
|  starCount  |             Number              |    星星个数    |





