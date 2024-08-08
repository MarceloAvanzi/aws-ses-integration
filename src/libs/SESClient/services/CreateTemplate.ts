import { CreateTemplateCommand, SESClient } from '@aws-sdk/client-ses';

import SESClientException from 'App/Exceptions/SESClientException';

import ITemplate from '../Interfaces/ITemplate';
import config from '../config/ses';

class CreateTemplate extends SESClient {
  constructor() {
    super(config);
  }

  public async execute({ templateName, subjectPart, textPart, htmlPart }: ITemplate): Promise<any> {
    const createTemplate = new CreateTemplateCommand({
      Template: {
        TemplateName: templateName,
        SubjectPart: subjectPart,
        TextPart: textPart,
        HtmlPart: htmlPart,
      },
    });

    try {
      const response = await this.send(createTemplate);

      return response;
    } catch (error) {
      throw new SESClientException(error.message, error.code);
    }
  }
}

export default CreateTemplate;
