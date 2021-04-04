import { ResponseTypes } from './fetch'
import { ArchiveJoinMessage, DownsteamMessage, GameJoinMessage } from './messageTypes'

export const isArchiveJoin = (
  msg: DownsteamMessage
): msg is ArchiveJoinMessage => msg.type === ResponseTypes.archiveJoin

export const isGameJoin = (msg:DownsteamMessage): msg is GameJoinMessage => msg.type === ResponseTypes.gameJoin
