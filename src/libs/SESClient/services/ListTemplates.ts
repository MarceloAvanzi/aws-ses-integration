import { ListTemplatesCommand, SESClient } from '@aws-sdk/client-ses';

import SESClientException from 'App/Exceptions/SESClientException';

import config from '../config/ses';

class ListTemplates extends SESClient {
  constructor() {
    super(config);
  }

  public async execute(maxItems = 10): Promise<any> {
    const listTemplates = new ListTemplatesCommand({
      MaxItems: maxItems,
    });

    try {
      const response = await this.send(listTemplates);

      return response;
    } catch (error) {
      throw new SESClientException(error.message, error.code);
    }
  }
}

export default ListTemplates;
