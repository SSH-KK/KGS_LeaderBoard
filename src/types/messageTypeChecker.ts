import { ResponseTypes } from './fetch'
import { ArchiveJoinMessage, GameJoinMessage, DownsteamMessage } from './messages'

export const isArchiveJoin = (
  msg: DownsteamMessage
): msg is ArchiveJoinMessage => msg.type === ResponseTypes.archiveJoin


export const isGameJoin = (
  msg: DownsteamMessage
): msg is GameJoinMessage => msg.type === ResponseTypes.gameJoin
