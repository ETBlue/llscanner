import { getID } from './tool'

export const boolean = {
  'yes': '是',
  'no': '否',
  'unsure': '我不確定',
}

export const workingHour = {
  'default': '一般（無變形）',
  'transformed_2w': '兩週變形',
  'transformed_4w': '四週變形',
  'transformed_8w': '八週變形',
  'duty': '責任制',
  'unsure': '我不確定',
}

export const contractTerm = {
  'non_fixed': '不定期',
  'fixed': '定期',
  'unsure': '我不確定',
}

export const jobNature = {
  'continuous': '連續性',
  'seasonal': '季節性',
  'short_term': '短期性',
  'specific': '特殊性',
  'temporary': '臨時性',
  'unsure': '我不確定',
}

export const industry = {
  'agriculture': '農',
  'forestry': '林',
  'fishery': '漁',
  'animal_husbandry': '牧',
  'mining': '礦',
  'quarrying': '土石採取',
  'manufacturing': '製造',
  'construction': '營造',
  'water_electricity': '水電',
  'gas_supply': '煤氣',
  'transportation': '運輸',
  'warehousing': '倉儲',
  'telecommunications': '通信',
  'mass_communication': '大眾傳播',
  'misc': '其他',
  'unsure': '我不確定',
}

export const wageBasis = {
  'monthly': '按月計算',
  'daily': '按日數計算',
  'hourly': '按時數計算',
  'piecework': '按件計算',
  'unsure': '我不確定',
}

export const holiday = {
  'annual_paid_leave': '特別休假',
  'designated_holiday': '國定假日',
  'regular_leave': '例假日',
  'rest_day': '休息日',
  'unsure': '我不確定',
}

export const booleanID = getID(boolean)
export const workingHourID = getID(workingHour)
export const contractTermID = getID(contractTerm)
export const jobNatureID = getID(jobNature)
export const industryID = getID(industry)
export const wageBasisID = getID(wageBasis)
export const holidayID = getID(holiday)
