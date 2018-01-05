import { getID } from './tool'

export const RuleSetLogic = {
  '&&': '且',
  '||': '或',
}

export const RuleLogic = {
  '==': '等於',
  '!=': '不等於',
  '>': '大於',
  '<=': '不超過',
  '<': '小於',
  '>=': '不小於',
  'belong_to': '屬於',
  '!belong_to': '不屬於',
  'include': '包含',
  '!include': '不包含',
}

export const RuleSetLogicID = getID(RuleSetLogic)
export const RuleLogicID = getID(RuleLogic)
