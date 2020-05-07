import moment from 'moment';

class DateHelper {
  now() {
    return new Date();
  }

  unix(timestamp) {
    return moment.unix(timestamp).toDate();
  }

  subtract(from, amount, unit) {
    return moment(from).subtract(amount, unit).toDate();
  }

  thisYear() {
    return moment().year();
  }

  thisMonth() {
    return moment().month() + 1;
  }

  startOfMonth(month = this.thisMonth(), year = this.thisYear()) {
    return moment([year, month - 1]).startOf('month').toDate();
  }

  endOfMonth(month = this.thisMonth(), year = this.thisYear()) {
    return moment([year, month - 1]).endOf('month').toDate();
  }

  startOfWeek(date = this.now()) {
    return moment(date).startOf('week').toDate();
  }

  endOfWeek(date = this.now()) {
    return moment(date).endOf('week').toDate();
  }

  isBetween(date, from, to) {
    return moment(date).isBetween(from, to);
  }

  isBefore(date, target) {
    return moment(date).isBefore(target);
  }

  isSameDay(date, target = this.now()) {
    return moment(date).isSame(target, 'day');
  }
}

const instance = new DateHelper();
export default instance;
