export async function handler(event: string, context: string){
    console.log("Stage name is" + process.env.stage);
    return {
        body: "lambda body, body comes here",
        statusCode: 200,
    }
}