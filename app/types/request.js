module.exports = {
  about: {
    profile: {
      type: 'object?',
      rule: {
        description: {
          type: 'string',
          min: 1,
        },
      },
    },
    platform: {
      type: 'object?',
      rule: {
        description: {
          type: 'string',
          min: 1,
        },
      },
    },
    carousel: {
      type: 'object?',
      rule: {
        number: {
          type: 'int',
          min: 1,
        },
        sort: {
          type: 'enum',
          values: ['pv', 'starCount'],
        },
        autoplay: 'boolean',
        loop: 'boolean',
        interval: {
          type: 'int',
          min: 500,
        },
      },
    },
    contact: {
      type: 'object?',
      rule: {
        qq: {
          type: 'string',
          min: 5,
        },
        wechat: {
          type: 'string',
          min: 1,
        },
        github: {
          type: 'string',
          min: 1,
        },
        phone: {
          type: 'string',
          min: 11,
          max: 11,
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
    nickname: {
      type: 'string?',
      min: 1,
    },
    role: {
      type: 'enum?',
      values: ['JUNIOR', 'SENIOR'],
    },
    level: {
      type: 'enum?',
      values: [1, 10],
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
          type: 'string?',
          min: 1,
        },
        path: {
          type: 'string?',
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
