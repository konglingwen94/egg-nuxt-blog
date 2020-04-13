 

# 文章分类表

> Model名称: Category

| Field |  Type  | Description |
| :---: | :----: | :---------: |
| name  | String |  分类名称   |

### 虚拟字段（数据动态计算，不做存储）

|         Field         |               Type               |  Description   |
| :-------------------: | :------------------------------: | :------------: |
|     articleCount      |              Number              |    文章个数    |
| articlePublishedCount |              Number              | 已发布文章个数 |
|      articleList      | [Array\<article\>](./article.md) |    文章列表    |

