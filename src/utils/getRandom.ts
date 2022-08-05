export default (min: number, max: number) => {
  if (max < min) throw '获取随机数失败，取值范围不正确';
  const num = Math.floor(Math.random() * (max - min + 1) + min);
  return num;
};
