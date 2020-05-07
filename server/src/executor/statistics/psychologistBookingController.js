import businessLayer from '../../businessLayer';

class BookingController {
  async getBookingStatistics(req, res) {
    const psychologistId = req.params.id;

    const { month, week, day } = await businessLayer.PsychologistStatistics.bookingStatistics(psychologistId);

    res.json({
      month: {
        capacity: month.capacity,
        booked: month.booked,
        fulfilled: month.fulfilled,
      },
      week: {
        capacity: week.capacity,
        booked: week.booked,
        fulfilled: week.fulfilled,
      },
      day: {
        capacity: day.capacity,
        booked: day.booked,
        fulfilled: day.fulfilled,
      },
    });
  }
}

const instance = new BookingController();
export default instance;
