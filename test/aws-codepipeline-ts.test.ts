import { handler } from "../lib/lambda/handler";

//https://docs.aws.amazon.com/codebuild/latest/userguide/test-reporting.html
test('foo', async () => {
    const result = await handler("", "");
    expect(result.statusCode).toEqual(200);
});