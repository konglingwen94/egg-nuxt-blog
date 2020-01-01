module.exports = {
  about: {
    id: {
      tyep: 'string',
      min: 24,
      maxLength: 24,
    },
    profile: {
      type: 'object',
      required: ['description'],
      properties: {
        description: {
          type: 'string',
          min: 1,
        },
      },
    },
    platform: {
      type: 'object',
      required: ['description'],
      properties: {
        description: {
          type: 'string',
          min: 1,
        },
      },
    },
  },
  admin: {
    username: {
      type: 'string',
      min: 1,
    },
    password: {
      type: 'string',
      min: 6,
    },
    oldPassword: {
      type: 'string',
      min: 6,
    },
    newPassword: {
      type: 'string',
      min: 6,
    },
    role: {
      type: 'string',
      enmu: ['JUNIOR', 'SENIOR'],
    },
    level: {
      type: 'number',
      enmu: [1, 10],
    },
  },
  article: {
    categoryID: { type: 'string', min: 24, max: 24 },
    tagIdList: {
      type: 'array?',

      itemType: 'string',
    },
    title: {
      type: 'string',
    },
    content: {
      type: 'object',

      rule: {
        html: {
          type: 'string',
        },
        text: {
          type: 'string',
        },
      },
    },
    cover: {
      type: 'object?',

      rule: {
        name: {
          type: 'string',
          min: 1,
        },
        path: {
          type: 'string',
          min: 1,
        },
      },
    },

    isPublished: {
      type: 'boolean?',
      default: true,
    },
  },
  category: {
    name: {
      type: 'string',
      min: 1,
    },
    cover: {
      type: 'object',
      rule: {
        path: 'string',
        name: 'string',
      },
    },
  },
  comment: {
    content: {
      type: 'string',
      min: 1,
    },
    email: {
      type: 'string?',
      format: 'email',
    },
    nickname: {
      type: 'string',
      min: 1,
    },
  },
  guestbook: {
    id: {
      type: 'string',
      min: 24,
      max: 24,
    },
    responseID: {
      type: 'string',
      min: 24,
      max: 24,
    },
    responseTo: {
      type: 'string',
    },
    content: {
      type: 'string',
      min: 1,
    },
    nickname: {
      type: 'string',
      min: 1,
    },
  },
  tag: {
    name: {
      type: 'string',
      min: 1,
    },
    cover: {
      type: 'object',
      rule: {
        path: 'string',
        name: 'string',
      },
    },
  },
}
