import * as moment from "moment";

export const formatNumber = (num: any): number => {
  if (num === null || num === undefined) {
    num = 0;
  } else if (typeof num === 'string') {
    num = parseFloat(num);
  }
  if (isNaN(num)) {
    num = 0;
  }
  return parseFloat(num.toFixed(2));
};

export  const  transformDataProduction= (data: any[]): any[] => {
    return data
      .map((item) => {
        const timestamp = moment(item.tanggal).valueOf();
        const formattedData = formatNumber(item.data);
        return [timestamp, formattedData];
      })
      .sort((a, b) => a[0] - b[0]);
  }

export const transformData = (data: any[]): any[] => {
  return data
    .map((item) => {
      const timestamp = new Date(item.tanggal + 'Z').getTime();
      const formattedData = formatNumber(item.data);
      return [timestamp, Number(formattedData)];
    })
    .sort((a, b) => a[0] - b[0]);
};

export const lightenColor = (color: string, percentage: number): string => {
  const r = Math.min(
    255,
    Math.floor(
      parseInt(color.slice(1, 3), 16) +
        (255 - parseInt(color.slice(1, 3), 16)) * percentage
    )
  );
  const g = Math.min(
    255,
    Math.floor(
      parseInt(color.slice(3, 5), 16) +
        (255 - parseInt(color.slice(3, 5), 16)) * percentage
    )
  );
  const b = Math.min(
    255,
    Math.floor(
      parseInt(color.slice(5, 7), 16) +
        (255 - parseInt(color.slice(5, 7), 16)) * percentage
    )
  );
  return `rgb(${r}, ${g}, ${b})`;
};
