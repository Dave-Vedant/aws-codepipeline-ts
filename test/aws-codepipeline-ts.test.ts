import { handler } from '../lib/lambda/handler';

describe('Lambda Function', () => {
  it('should return a successful response', async () => {
    const event = 'event data';
    const context = 'context data';

    const response = await handler(event, context);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('Hello from a Lambda Function');
  });
});