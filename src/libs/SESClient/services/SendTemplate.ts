import { SESClient, SendTemplatedEmailCommand } from '@aws-sdk/client-ses';

import SESClientException from 'App/Exceptions/SESClientException';

import ISendTemplate from '../Interfaces/ISendTemplate';
import config from '../config/ses';

class SendTemplate extends SESClient {
  constructor() {
    super(config);
  }

  public async execute({ toAddresses, template, templateData }: ISendTemplate): Promise<any> {
    const sendTemplatedEmail = new SendTemplatedEmailCommand({
      Source: process.env.APP_MAIL,
      Destination: {
        ToAddresses: toAddresses,
      },
      Template: template,
      TemplateData: JSON.stringify(templateData),
    });

    try {
      const response = await this.send(sendTemplatedEmail);

      return response;
    } catch (error) {
      console.log(error);
      throw new SESClientException(error.message, error.code);
    }
  }
}

export default SendTemplate;
