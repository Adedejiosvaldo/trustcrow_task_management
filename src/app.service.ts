import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): { message: string; documentation: string } {
    return {
      message: 'Server is up and running!',
      documentation:
        'https://documenter.getpostman.com/view/28957165/2sAYdkFnw9',
    };
  }
}
