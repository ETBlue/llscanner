const template =  {
  'id' : '',
  'type' : 'select', // select, input
  'title' : '',
  'description' : '',
  'option' : '', // boolean, ...
  'route' : {},
  'precondition' : {
    'logic' : 'and', // and, or
    'rule': [
      {
        'target': '', // quiz id
        'logic': '', // rule logics
        'value': '', // if option: option values
      },
    ],
  },
}

const QuizData = [
  {
    "order": 1,
    "type": "select",
    "id": "工作性質",
    "title": "",
    "description": "",
    "option": "jobNature",
    "route": "",
    "precondition": ""
  },
  {
    "order": 2,
    "type": "select",
    "id": "工作所屬產業",
    "title": "",
    "description": "",
    "option": "industry",
    "route": "",
    "precondition": ""
  },
  {
    "order": 3,
    "type": "select",
    "id": "工作設定：酬勞計算基準",
    "title": "",
    "description": "",
    "option": "wageBasis",
    "route": "",
    "precondition": ""
  },
  {
    "order": 4,
    "type": "input",
    "id": "工作設定：平日工資（金額，每月）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 5,
    "type": "input",
    "id": "工作設定：平日工資（金額，每小時）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 6,
    "type": "select",
    "id": "勞工：假日：休息日：給薪？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 7,
    "type": "select",
    "id": "勞工：假日：例假日：給薪？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 8,
    "type": "select",
    "id": "勞工：假日：國定假日：放假？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 9,
    "type": "select",
    "id": "勞工：假日：國定假日：給薪？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 10,
    "type": "select",
    "id": "勞工：假日：特別休假日：給薪？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 11,
    "type": "select",
    "id": "契約約期",
    "title": "",
    "description": "",
    "option": "contractTerm",
    "route": "",
    "precondition": ""
  },
  {
    "order": 12,
    "type": "input",
    "id": "勞工：同一雇主繼續工作期間（滿年數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 13,
    "type": "input",
    "id": "勞工：同一雇主繼續工作期間（滿月數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 14,
    "type": "input",
    "id": "勞工：同一雇主繼續工作期間（未滿月數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 15,
    "type": "input",
    "id": "勞工：假日：特別休假日（日數，每年）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 16,
    "type": "select",
    "id": "勞工：工會？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 17,
    "type": "select",
    "id": "工作設定：工時制度",
    "title": "",
    "description": "",
    "option": "workingHour",
    "route": "",
    "precondition": ""
  },
  {
    "order": 18,
    "type": "input",
    "id": "工作設定：工時制度：一般：正常工作時間（時數，每日）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 19,
    "type": "input",
    "id": "工作設定：工時制度：一般：正常工作時間（時數，每週）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 20,
    "type": "input",
    "id": "工作設定：工時制度：一般：例假（日數，每七日）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 21,
    "type": "input",
    "id": "工作設定：工時制度：一般：放假（日數，每七日）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 22,
    "type": "select",
    "id": "工作設定：工時制度：兩週變形：指定行業？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 23,
    "type": "select",
    "id": "工作設定：工時制度：兩週變形：工會同意？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 24,
    "type": "select",
    "id": "工作設定：工時制度：兩週變形：勞資會議同意？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 25,
    "type": "input",
    "id": "工作設定：工時制度：兩週變形：正常工作時間（時數，每週）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 26,
    "type": "input",
    "id": "工作設定：工時制度：兩週變形：正常工作時間：自其他工作日分配（時數，每日）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 27,
    "type": "input",
    "id": "工作設定：工時制度：兩週變形：正常工作時間：分配至其他工作日（日數，每二週）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 28,
    "type": "input",
    "id": "工作設定：工時制度：兩週變形：例假（日數，每二週）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 29,
    "type": "input",
    "id": "工作設定：工時制度：兩週變形：放假（日數，每二週）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 30,
    "type": "select",
    "id": "工作設定：工時制度：八週變形：指定行業？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 31,
    "type": "select",
    "id": "工作設定：工時制度：八週變形：工會同意？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 32,
    "type": "select",
    "id": "工作設定：工時制度：八週變形：勞資會議同意？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 33,
    "type": "input",
    "id": "工作設定：工時制度：八週變形：正常工作時間（時數，每日）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 34,
    "type": "input",
    "id": "工作設定：工時制度：八週變形：正常工作時間（時數，每週）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 35,
    "type": "input",
    "id": "工作設定：工時制度：八週變形：放假（日數，每八週）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 36,
    "type": "select",
    "id": "工作設定：工時制度：四週變形：指定行業？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 37,
    "type": "select",
    "id": "工作設定：工時制度：四週變形：工會同意？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 38,
    "type": "select",
    "id": "工作設定：工時制度：四週變形：勞資會議同意？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 39,
    "type": "input",
    "id": "工作設定：工時制度：四週變形：正常工作時間（時數，每日）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 40,
    "type": "input",
    "id": "工作設定：工時制度：四週變形：正常工作時間：自其他工作日分配（時數，每日）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 41,
    "type": "input",
    "id": "工作設定：工時制度：四週變形：放假（日數，每四週）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 42,
    "type": "select",
    "id": "工作設定：工時制度：主管機關命令調整？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 43,
    "type": "select",
    "id": "工作設定：工時制度：主管機關命令調整：公眾生活便利或其他特殊原因？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 44,
    "type": "select",
    "id": "工作設定：班表：輪班制？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 45,
    "type": "select",
    "id": "工作設定：班表：輪班制：每週換班？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 46,
    "type": "select",
    "id": "工作設定：班表：輪班制：勞工同意不每週換班？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 47,
    "type": "select",
    "id": "工作設定：班表：輪班制：換班連續十一小時休息？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 48,
    "type": "input",
    "id": "工作設定：班表：休息（分鐘數，每連續四小時）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 49,
    "type": "select",
    "id": "工作設定：工作場所：坑內：非監視？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 50,
    "type": "select",
    "id": "契約：競業禁止？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 51,
    "type": "select",
    "id": "契約：競業禁止：勞工工作接觸營業秘密？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 52,
    "type": "select",
    "id": "契約：競業禁止：雇主有應受保護之正當營業利益？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 53,
    "type": "input",
    "id": "契約：競業禁止期間（年數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 54,
    "type": "select",
    "id": "契約：競業禁止：期間、區域、範圍、就業對象合理？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 55,
    "type": "select",
    "id": "契約：競業禁止：合理補償？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 56,
    "type": "select",
    "id": "契約：競業禁止：合理補償：包括工作給付？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 57,
    "type": "select",
    "id": "個案：雇主終止勞動契約？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 58,
    "type": "input",
    "id": "個案：雇主終止勞動契約：預告（日數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 59,
    "type": "select",
    "id": "個案：雇主終止勞動契約：給付預告期間工資？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 60,
    "type": "input",
    "id": "個案：雇主終止勞動契約：勞工另謀工作請假：時數（日數，每週）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 61,
    "type": "select",
    "id": "個案：雇主終止勞動契約：勞工另謀工作請假：工資照給？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 62,
    "type": "input",
    "id": "個案：雇主終止勞動契約：資遣費（金額）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 63,
    "type": "input",
    "id": "個案：雇主終止勞動契約：資遣費：終止到發給期間（日數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 64,
    "type": "select",
    "id": "個案：不定期契約停止履行？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 65,
    "type": "select",
    "id": "個案：不定期契約停止履行：繼續履行原約？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 66,
    "type": "select",
    "id": "個案：不定期契約停止履行：繼續履行原約：前後工作年資合併計算？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 67,
    "type": "input",
    "id": "個案：不定期契約停止履行：繼續履行原約：前後契約間斷期間（月數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 68,
    "type": "select",
    "id": "個案：不定期契約停止履行：另訂新約？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 69,
    "type": "select",
    "id": "個案：不定期契約停止履行：另訂新約：前後工作年資合併計算？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 70,
    "type": "input",
    "id": "個案：不定期契約停止履行：另訂新約：前後契約間斷期間（月數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 71,
    "type": "select",
    "id": "個案：定期契約屆滿？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 72,
    "type": "select",
    "id": "個案：定期契約屆滿：繼續工作？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 73,
    "type": "select",
    "id": "個案：定期契約屆滿：繼續工作：雇主即反對？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 74,
    "type": "select",
    "id": "個案：定期契約屆滿：另訂新約？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 75,
    "type": "select",
    "id": "個案：定期契約屆滿：另訂新約：前後工作年資合併計算？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 76,
    "type": "input",
    "id": "個案：定期契約屆滿：另訂新約：前後契約工作期間（日數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 77,
    "type": "input",
    "id": "個案：定期契約屆滿：另訂新約：前後契約間斷期間（日數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 78,
    "type": "input",
    "id": "個案：定期契約屆滿：另訂新約：前後契約間斷期間（月數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 79,
    "type": "input",
    "id": "個案：當日：前六個月總日數（日數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 80,
    "type": "input",
    "id": "個案：當日：前六個月工作日數（日數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 81,
    "type": "input",
    "id": "個案：當日：前六個月工資總額（金額）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 82,
    "type": "input",
    "id": "個案：當日：平均工資（金額，每日）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 83,
    "type": "input",
    "id": "個案：當日：平均工資（金額，每月）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 84,
    "type": "input",
    "id": "個案：工作期間工作日數（日數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 85,
    "type": "input",
    "id": "個案：工作期間工資總額（金額）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 86,
    "type": "input",
    "id": "個案：工作期間總日數（日數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 87,
    "type": "select",
    "id": "工作性質：連續性或緊急性？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 88,
    "type": "select",
    "id": "個案：延長工作時間：突發？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 89,
    "type": "select",
    "id": "個案：延長工作時間：突發：假日種類",
    "title": "",
    "description": "",
    "option": "holiday",
    "route": "",
    "precondition": ""
  },
  {
    "order": 90,
    "type": "select",
    "id": "個案：延長工作時間：突發：二十四小時內通知工會？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 91,
    "type": "select",
    "id": "個案：延長工作時間：突發：二十四小時內報當地主管機關？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 92,
    "type": "input",
    "id": "個案：延長工作時間：突發（時數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 93,
    "type": "select",
    "id": "個案：延長工作時間：突發：事後補休？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 94,
    "type": "input",
    "id": "個案：延長工作時間：突發：工資（金額，每小時）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 95,
    "type": "select",
    "id": "個案：延長工作時間：非突發？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 96,
    "type": "select",
    "id": "個案：延長工作時間：非突發：工會同意？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 97,
    "type": "select",
    "id": "個案：延長工作時間：非突發：勞資會議同意？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 98,
    "type": "input",
    "id": "個案：延長工作時間：非突發：總工作時間（時數，每日）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 99,
    "type": "input",
    "id": "個案：延長工作時間：非突發：總延長工作時間（時數，每月）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 100,
    "type": "select",
    "id": "個案：延長工作時間：非突發：平日？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 101,
    "type": "input",
    "id": "個案：延長工作時間：非突發：平日（時數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 102,
    "type": "input",
    "id": "個案：延長工作時間：非突發：平日：工資（金額）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 103,
    "type": "input",
    "id": "個案：延長工作時間：非突發：平日：四週變形（時數，每日）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 104,
    "type": "select",
    "id": "個案：延長工作時間：非突發：休息日？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 105,
    "type": "input",
    "id": "個案：延長工作時間：非突發：休息日（時數）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 106,
    "type": "input",
    "id": "個案：延長工作時間：非突發：休息日：工資（金額）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 107,
    "type": "select",
    "id": "個案：延長工作時間：非突發：國定假日？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 108,
    "type": "select",
    "id": "個案：延長工作時間：非突發：國定假日：勞工同意？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 109,
    "type": "input",
    "id": "個案：延長工作時間：非突發：國定假日：工資（金額，每小時）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 110,
    "type": "select",
    "id": "個案：延長工作時間：非突發：特別休假日？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 111,
    "type": "select",
    "id": "個案：延長工作時間：非突發：特別休假日：勞工同意？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 112,
    "type": "select",
    "id": "個案：延長工作時間：非突發：特別休假日：主管機關認有必要？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  },
  {
    "order": 113,
    "type": "input",
    "id": "個案：延長工作時間：非突發：特別休假日：工資（金額，每小時）",
    "title": "",
    "description": "",
    "option": "",
    "route": "",
    "precondition": ""
  },
  {
    "order": 114,
    "type": "select",
    "id": "個案：延長工作時間：勞工正當理由不接受？",
    "title": "",
    "description": "",
    "option": "boolean",
    "route": "",
    "precondition": ""
  }
]

export default QuizData