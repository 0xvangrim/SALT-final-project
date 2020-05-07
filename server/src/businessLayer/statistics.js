import DateHelper from './dateHelper';
import Slot from './slot';
import Template from './template';
import config from '../config';

class PsychologistStatistics {
  async averageMeetingLengthMonthly(psychologistId, month = DateHelper.thisMonth(), year = DateHelper.thisYear()) {
    const templateIds = (await Template.findAllTemplates())
      .filter((x) => x.name !== 'tech_test')
      .map((x) => x.templateId);

    const response = await Slot.sumMeetingLengthByPsychologist(
      psychologistId,
      DateHelper.startOfMonth(month, year),
      DateHelper.isBefore(DateHelper.now(), DateHelper.endOfMonth(month, year)) ? DateHelper.now() : DateHelper.endOfMonth(month, year),
      [config.sequelize.ENUMS.BOOKING_STATUSES.REDACTED_TWO],
      templateIds,
      true, // Must be payed
    );

    const { sum, count } = response.toJSON();
    return Math.round(sum / count);
  }

  async countSlotsByTemplateMonthly(psychologistId, template, month = DateHelper.thisMonth(), year = DateHelper.thisYear()) {
    const { templateId } = (await Template.findTemplateByName(template)).toJSON();

    const response = await Slot.countAllByPsychologist(
      psychologistId,
      DateHelper.startOfMonth(month, year),
      DateHelper.endOfMonth(month, year),
      [config.sequelize.ENUMS.BOOKING_STATUSES.REDACTED_TWO],
      [templateId],
    );

    return response.toJSON().count;
  }

  async bookingStatistics(psychologistId, month = DateHelper.thisMonth(), year = DateHelper.thisYear()) {
    const templateIds = (await Template.findAllTemplates())
      .filter((x) => x.name !== 'tech_test')
      .map((x) => x.templateId);

    const capacityMonth = await Slot.findStartsAtByPsychologist(
      psychologistId,
      DateHelper.startOfMonth(month, year),
      DateHelper.endOfMonth(month, year),
      [config.sequelize.ENUMS.BOOKING_STATUSES.REDACTED_TWO, config.sequelize.ENUMS.BOOKING_STATUSES.REDACTED_ONE],
      templateIds,
    );

    const bookedMonth = await Slot.findStartsAtByPsychologist(
      psychologistId,
      DateHelper.startOfMonth(month, year),
      DateHelper.endOfMonth(month, year),
      [config.sequelize.ENUMS.BOOKING_STATUSES.REDACTED_TWO],
      templateIds,
    );

    const fulfilledMonth = await Slot.findStartsAtByPsychologist(
      psychologistId,
      DateHelper.startOfMonth(month, year),
      DateHelper.isBefore(DateHelper.now(), DateHelper.endOfMonth(month, year)) ? DateHelper.now() : DateHelper.endOfMonth(month, year),
      [config.sequelize.ENUMS.BOOKING_STATUSES.REDACTED_TWO],
      templateIds,
      true, // Must be payed
    );


    const capacityWeek = capacityMonth.filter((slot) => DateHelper.isBetween(slot.startsAt, DateHelper.startOfWeek(), DateHelper.endOfWeek()));
    const bookedWeek = bookedMonth.filter((slot) => DateHelper.isBetween(slot.startsAt, DateHelper.startOfWeek(), DateHelper.endOfWeek()));
    const fulfilledWeek = fulfilledMonth.filter((slot) => DateHelper.isBetween(slot.startsAt, DateHelper.startOfWeek(), DateHelper.endOfWeek()));

    const capacityDay = capacityMonth.filter((slot) => DateHelper.isSameDay(slot.startsAt));
    const bookedDay = bookedMonth.filter((slot) => DateHelper.isSameDay(slot.startsAt));
    const fulfilledDay = fulfilledMonth.filter((slot) => DateHelper.isSameDay(slot.startsAt));

    return {
      month: {
        capacity: capacityMonth.length,
        booked: bookedMonth.length,
        fulfilled: fulfilledMonth.length,
      },
      week: {
        capacity: capacityWeek.length,
        booked: bookedWeek.length,
        fulfilled: fulfilledWeek.length,
      },
      day: {
        capacity: capacityDay.length,
        booked: bookedDay.length,
        fulfilled: fulfilledDay.length,
      },
    };
  }
}

const psychologistInstance = new PsychologistStatistics();
export { psychologistInstance };
