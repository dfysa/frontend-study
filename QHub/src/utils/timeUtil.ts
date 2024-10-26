class TimeUtil {
  /**
   * 将时间戳转换为指定格式的日期字符串
   * @param timestamp - Unix 时间戳（秒）
   * @param format - 日期格式，默认 'YYYY-MM-DD HH:mm:ss'
   * @returns 格式化后的日期字符串
   */
  static format(
    timestamp: number,
    format: string = "YYYY-MM-DD HH:mm:ss"
  ): string {
    const date = new Date(timestamp * 1000);
    const map: { [key: string]: string } = {
      YYYY: date.getFullYear().toString(),
      MM: String(date.getMonth() + 1).padStart(2, "0"),
      DD: String(date.getDate()).padStart(2, "0"),
      HH: String(date.getHours()).padStart(2, "0"),
      mm: String(date.getMinutes()).padStart(2, "0"),
      ss: String(date.getSeconds()).padStart(2, "0"),
    };
    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (matched) => map[matched]);
  }

  /**
   * 将时间戳转换为相对时间，如“几分钟前”、“几小时前”等
   * @param timestamp - Unix 时间戳（秒）
   * @returns 相对时间描述
   */
  static timeAgo(timestamp: number): string {
    const now = Math.floor(Date.now() / 1000);
    const timeDiff = now - timestamp;

    const seconds = timeDiff;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "刚刚发布";
    } else if (minutes < 60) {
      return `${minutes} 分钟前`;
    } else if (hours < 24) {
      return `${hours} 小时前`;
    } else if (days === 1) {
      return `昨天 ${TimeUtil.format(timestamp, "HH:mm")}`; // 显示昨天的时间
    } else {
      return TimeUtil.format(timestamp); // 返回具体日期
    }
  }

  /**
   * 检查一个时间戳是否是今天
   * @param timestamp - Unix 时间戳（秒）
   * @returns 如果是今天返回 true，否则返回 false
   */
  static isToday(timestamp: number): boolean {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
}

export default TimeUtil;
