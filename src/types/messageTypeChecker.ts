import { ResponseTypes } from './fetch'
import { ArchiveJoinMessage, DownsteamMessage } from './messageTypes'

export const isArchiveJoin = (
  msg: DownsteamMessage
): msg is ArchiveJoinMessage => msg.type === ResponseTypes.archiveJoin
