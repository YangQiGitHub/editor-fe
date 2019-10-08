import {getPageInnerHeight, getModelHeight} from '@/lib/utils'

export const setA = (state) => {
  state.a++;
};

export const appendModel = (state, models) => {
  console.log('appendModel', models)
  state.models = []
  state.models = [...state.models, ...models]
}

export const insertModelAfter = function (state, { blockId, model}) {
  // console.log('insertModelAfter', blockId, model)
  const idx = state.models.findIndex((item) => {
    return item.blockId === blockId
  })
  state.models.splice(idx + 1, 0, model)
}

export const changeModelInfo = function (state, { blockId, prop, val}) {
  console.log('changeModelInfo', {blockId, prop, val})
  let model = state.models.find((item) => {
    return item.blockId === +blockId
  })
  let props = prop.split('.')
  let temp = {};
  for (let i = 0; i < props.length; i++) {
    if (i === (props.length - 1)) {
      return temp[props[i]] = val
    }
    temp = model[props[i]]
  }
}

export const delModel = function (state, blockId) {
  console.log('delModel', blockId)
  const idx = state.models.findIndex((item) => {
    return item.blockId === blockId
  })
  state.models.splice(idx, 1)
}

export const makePageList = function (state) {
  // console.log(getPageInnerHeight(), '----')
  const pageHeight = getPageInnerHeight()
  let pageList = []
  let pageListIdx = 0
  let tempMarginTop = 0
  let tempTotalHeight = 0
  let tempList = []

  state.models.forEach((item) => {
    const modelHeight = getModelHeight(item)

    tempTotalHeight += modelHeight
    if ((pageHeight - tempTotalHeight) >= 0) {
      tempList.push(item)
      pageList[pageListIdx] = {
        marginTop: tempMarginTop,
        list: [...tempList]
      }
      return;
    }
    if ((pageHeight - tempTotalHeight) < 0) {
      pageList[pageListIdx] = {
        marginTop: tempMarginTop,
        list: [...tempList, item]
      }
      pageListIdx += 1
      tempList = [item]
      tempMarginTop = -(modelHeight + (pageHeight - tempTotalHeight))
      tempTotalHeight = pageHeight - tempTotalHeight
      tempTotalHeight += modelHeight

      pageList[pageListIdx] = {
        marginTop: tempMarginTop,
        list: [...tempList]
      }
    }
  })
  console.log(pageList)
  state.pageList = pageList
}