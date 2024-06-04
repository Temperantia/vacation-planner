import dayjs from "dayjs";

interface DateTextProps {
  date: Date;
}

const DateText = ({ date }: DateTextProps) => {
  return <>{dayjs(date).format("DD/MM/YYYY HH:MM")}</>;
};

export default DateText;
