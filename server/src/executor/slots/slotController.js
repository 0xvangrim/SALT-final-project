import businessLayer from '../../businessLayer';

class SlotController {
  async getAllSlots(req, res) {
    const slots = await businessLayer.Slot.findAll();

    res.status(200).send({
      data: slots,
    });
  }
}

const instance = new SlotController();
export default instance;
