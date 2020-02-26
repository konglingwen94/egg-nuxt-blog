module.exports = {
  configuration: {
    profile: {
      personal: {
        type: 'object?',
        rule: {
          contact: {
            type: 'array',
            itemType: 'object',
            rule: {
              label: {
                type: 'string',
                value: 'string',
              },
            },
            min: 1,
          },
          description: {
            type: 'string',
            min: 1,
          },
        },
      },
      technology: {
        type: 'object?',
        rule: {
          frontend: {
            type: 'string',
            min: 1,
          },
          serverSide: {
            type: 'string',
            min: 1,
          },
        },
      },
    },
    projectIntro: {
      platform: {
        type: 'object?',
        rule: {
          webClient: {
            type: 'string',
            min: 1,
          },
          serverUI: {
            type: 'string',
            min: 1,
          },
          serverApi: {
            type: 'string',
            min: 1,
          },
        },
      },
    },
    siteConfig: {
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
      message: {
        type: 'object?',
        rule: {
          renderLayer: 'int',
          expandLayer: 'int',
        },
      },
    },
  },

  account: {
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
    categoryID: 'objectId',
    tagIdList: 'objectIdList',
    title: {
      type: 'string',
      min: 1,
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
      type: 'email',
    },
    nickname: {
      type: 'string',
      min: 1,
    },
  },

  message: {
    content: {
      type: 'string',
      min: 1,
    },
    email: {
      type: 'email',
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
