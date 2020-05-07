import moment from 'moment';

class DateHelper {
  thisMonth() {
    return moment().month() + 1;
  }

  thisYear() {
    return moment().year();
  }

  startOfMonth(month = this.thisMonth(), year = this.thisYear()) {
    return moment([year, month - 1]).startOf('month').unix();
  }

  endOfMonth(month = this.thisMonth(), year = this.thisYear()) {
    return moment([year, month - 1]).endOf('month').unix();
  }
}

const instance = new DateHelper();
export default instance;
