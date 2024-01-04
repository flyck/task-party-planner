import { util } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

/**
 * Sends a request to get an item with id `ctx.args.id`
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {import('@aws-appsync/utils').DynamoDBPutItemRequest} the request
 */
export function request(ctx) {
  if (!ctx.prev.result) {
    util.error("Cannot create participant for non-exsiting party!")
  }

  const id = util.autoId().slice(0, 4)

  return ddb.put({ key: { partyId: ctx.args.partyId, id }, item: ctx });
}

export const response = (ctx) => ctx.result;
