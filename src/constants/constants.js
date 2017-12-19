export const rcuStatus = [
  {
    label: "待租",
    value: 0
  },
  {
    label: "已租",
    value: 1
  },
  {
    label: "预定",
    value: 2
  },
  {
    label: "空房",
    value: 3
  }
];

export const roomScopeArray = ["本房", "本层", "本栋", "全部"];

export const statusScopeArray = ["待租", "已租", "空房"];

export const cardScopeArray = ["无卡", "客人卡", "服务员卡", "管理员卡"];

export const acPower = ["关闭", "开启"];

export const acMode = ["自动", "制热", "制冷", "通风"];

export const acSpeed = ["自动", "高", "中", "低"];

let acTempArray = [];
for(var i = 6; i<= 35; i++) {
    acTempArray.push(i);
}

export const acTemp = acTempArray;



