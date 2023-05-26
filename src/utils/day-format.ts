import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export default function formatUtcString(
  utcString: string,
  format: string = TIME_FORMAT
) {
  return dayjs.utc(utcString).format(format)
}
