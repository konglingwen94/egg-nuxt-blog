const commonFields = ['id', 'createdAt', 'updatedAt']

const fields = {
  admin: ['level', 'username', 'nickname', 'role'],
  article: [
    'starCount',
    'tagIdList',
    'categoryIds',
    'isPublished',
    'pv',
    'comment',
    'categoryID',
    'title',
    'content',
    'cover',
  ],
  articleCategories: [
    'name',
    'starCount',
    'articleIdList',
    'publishedArticleCount',
  ],
  comment: ['content', 'nickname', 'thumbupCount'],
  guestbook: ['content', 'diggCount', 'nickname', 'dialogues'],
  tag: ['name', 'articleIdList'],
}

for (let key in fields) {
  fields[key].push(...commonFields)
}

module.exports = fields
