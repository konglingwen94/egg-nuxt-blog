# 留言

> Model 名称: Guestbook

|   Field   |       Type        | Description  |
| :-------: | :---------------: | :----------: |
|  content  |      String       |   留言内容   |
| nickname  |      String       | 留言用户昵称 |
| dialogues | Array\<Dialogue\> |   回复留言   |
| diggCount |      Number       |   点赞数量   |

## Dialogue

|   Field    |   Type   | Description  |
| :--------: | :------: | :----------: |
|  content   |  String  |   回复内容   |
|  nickname  |  String  | 回复用户昵称 |
| responseTo | ObjectId |   @用户ID    |
| diggCount  | Boolean  |   点赞数量   |