import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

// 注册UTC插件
dayjs.extend(utc)

export default dayjs
