import { MODEL_NAME, MODEL_ATTR } from '@/lib/constants'

export const initBlockId = function () {
  return +Date.now()
}

export const initModelDefaultData = function ({name}) {
  const defaultData = {
    CHAPTER: {
      menuInfo: {
        menuText: '章节',
        level: 0
      },
      blockInfo: {
        type: MODEL_NAME[name],
        richText1: '',
        richText2: ''
      }
    }, 
    UNIT: {
      menuInfo: {
        menuText: '段落',
        level: 0
      },
      blockInfo: {
        type: MODEL_NAME[name],
        richText1: ''
      }
    },
    REMARK: {
      menuInfo: {
        menuText: '备注',
        level: 0
      },
      blockInfo: {
        type: MODEL_NAME[name],
        richText1: ''
      }
    },
    CHUNK: {
      menuInfo: {
        menuText: '板块',
        level: 0
      },
      blockInfo: {
        type: MODEL_NAME[name],
        richText1: ''
      }
    },
    NOTE: {
      menuInfo: {
        menuText: '笔记区',
        level: 0
      },
      blockInfo: {
        type: MODEL_NAME[name],
        richText1: ''
      }
    }
  }
  return {
    blockId: initBlockId(),
    menuInfo: defaultData[name].menuInfo,
    pageInfo: Object.assign({}, MODEL_ATTR),
    blockInfo: defaultData[name].blockInfo
  }
}

