import businessLayer from '../../businessLayer';

class PatientController {
  async getPatientStatistics(req, res) {
    const psychologistId = req.params.id;

    const averageMeetingLengthRequest = businessLayer.PsychologistStatistics.averageMeetingLengthMonthly(psychologistId);
    const newVisitsRequest = businessLayer.PsychologistStatistics.countSlotsByTemplateMonthly(psychologistId, 'new_visit');
    const revisitsRequest = businessLayer.PsychologistStatistics.countSlotsByTemplateMonthly(psychologistId, 'revisit');

    res.json({
      averageMeetingLength: await averageMeetingLengthRequest,
      visits: {
        newVisits: await newVisitsRequest,
        revisits: await revisitsRequest,
      },
    });
  }
}

const instance = new PatientController();
export default instance;
