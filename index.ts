import * as express from 'express';
import * as pubsub from '@google-cloud/pubsub';

export function sayHello(req: express.Request, res: express.Response) {
  // Example input: {"message": "Hello!"}
  if (req.body.message === undefined) {
    // This is an error case, as "message" is required.
    res.status(400).send('No message defined!');
  } else {
    // Everything is okay.
    console.log(req.body.message);
    res.status(200).send('Success: ' + req.body.message);
  }
};

/**
 *
 * @param event
 * @param callback
 */
export function onPubsub(event: any, callback: Function) {
  const pubsubMessage = event.data;
  console.log(Buffer.from(pubsubMessage.data, 'base64').toString());
  callback();
};
