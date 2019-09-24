const commonFields = ['id', 'createdAt', 'updatedAt']

const fields = {
  admin: ['level', 'username', 'nickname', 'role'],
  about: ['profile', 'platform'],
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
  category: ['name', 'starCount', 'articleIdList', 'publishedArticleCount'],
  comment: ['content', 'nickname', 'thumbupCount'],
  guestbook: ['content', 'diggCount', 'nickname', 'dialogues'],
  tag: ['name'],
}

for (let key in fields) {
  fields[key].push(...commonFields)
}

module.exports = fields
