import DAL from '../DAL';

class Template {
  findAllTemplates() {
    return DAL.DB.Template.findAll({
      attributes: ['templateId', 'name'],
    });
  }

  findTemplateByName(name) {
    return DAL.DB.Template.findOne({
      attributes: ['templateId'],
      where: {
        name,
      },
    });
  }
}

const instance = new Template();
export default instance;
