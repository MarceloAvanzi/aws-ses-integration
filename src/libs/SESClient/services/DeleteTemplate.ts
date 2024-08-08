import { DeleteTemplateCommand, SESClient } from '@aws-sdk/client-ses';

import SESClientException from 'App/Exceptions/SESClientException';

import config from '../config/ses';

class DeleteTemplate extends SESClient {
  constructor() {
    super(config);
  }

  public async execute(templateName: string): Promise<any> {
    const listTemplates = new DeleteTemplateCommand({
      TemplateName: templateName,
    });

    try {
      const response = await this.send(listTemplates);

      return response;
    } catch (error) {
      throw new SESClientException(error.message, error.code);
    }
  }
}

export default DeleteTemplate;
