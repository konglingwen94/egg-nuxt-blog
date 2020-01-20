# API 接口文档

## 指南

```
本接口按照RESTful 风格的Api 进行开发，如无特殊说明均按照RESTful 风格的请求方法使用
```

## ROOT

`/api`

#### 管理后台接口命名空间

`/admin`


## 更新数据库返回值

 |    Field    |  Type   |     Description      |
 | :---------: | :-----: | :------------------: |
 |     ok      |  Enum   | 状态 1:成功，0: 失败 |
 |      n      | Integer |     操作文档个数     |
 |  nModified  | Integer |     生效文档个数     |
 | deleteCount | Integer |     删除文档个数     |

## 参数

::: tip 参数规则
如无特殊指明，所有的创建类操作参数默认都是**必选参数**，所有的更新类操作参数默认都是**可选参数**。
:::
