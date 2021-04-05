import { ResponseTypes } from './fetch'
import { ArchiveJoinMessage, DownsteamMessage } from './messages'

export const isArchiveJoin = (
  msg: DownsteamMessage
): msg is ArchiveJoinMessage => msg.type === ResponseTypes.archiveJoin

export const isNoSuchUser = (msg: DownsteamMessage) =>
  msg.type === ResponseTypes.noSuchUser

export const isWrongPassword = (msg: DownsteamMessage) =>
  msg.type === ResponseTypes.wrongPassword

export const isLoginSuccess = (msg: DownsteamMessage) =>
  msg.type === ResponseTypes.loginSuccess
