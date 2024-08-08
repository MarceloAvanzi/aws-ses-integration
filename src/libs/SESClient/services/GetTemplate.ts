import { GetTemplateCommand, SESClient } from '@aws-sdk/client-ses';

import SESClientException from 'App/Exceptions/SESClientException';

import config from '../config/ses';

class GetTemplate extends SESClient {
  constructor() {
    super(config);
  }

  public async execute(templateName: string): Promise<any> {
    const listTemplates = new GetTemplateCommand({
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

export default GetTemplate;
