import getRandom from '@/utils/getRandom';
import { Tag } from 'antd';

export default (props: { source: string[] }) => {
  const colorSource = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ] as const;
  const randomColor: typeof colorSource[number][] = [];
  const { source } = props;
  const length = source.length;

  while (randomColor.length < length) {
    if (randomColor.length >= colorSource.length) {
      const random = getRandom(0, colorSource.length - 1);
      randomColor.push(colorSource[random]);
    } else {
      let random;
      while (
        (random = getRandom(0, colorSource.length - 1)) &&
        randomColor.includes(colorSource[random])
      ) {}
      randomColor.push(colorSource[random]);
    }
  }

  return (
    <>
      {source.map((item, index) => {
        return (
          <Tag key={index} color={randomColor[index]}>
            {item}
          </Tag>
        );
      })}
    </>
  );
};
