import { get, set } from 'idb-keyval'

import {GameSummaryT, FetchedEvent} from '@type/fetch'
import { isArchiveJoin, isGameJoin } from '@type/messageTypeChecker'
import { DownsteamMessage } from '@type/messages'
import { SetTopFT, TopUserInfoT } from '@type/top'

export const reducerConstructor = (archiveJoinMethods: {
  setTopList: SetTopFT
}) => {
  return async (message: DownsteamMessage) => {
    if (isArchiveJoin(message)) {
      // const userInfo = await iDB.get<TopUserInfoT>('top', message.user.name)
      // const games = []

      // for (const game of message.games)
      //   if (!game.inPlay && game.score !== 'UNFINISHED') games.push(game)

      // await iDB.put<TopUserInfoT>('top',{
      //   username: message.user.name,
      //   ...userInfo,
      //   games,
      // })
    }
    else if(isGameJoin(message)){
      const lastTimestamp = (await iDB.all('game_query'))[0]
      await iDB.dell('game_query',lastTimestamp)
      const gameSummary = message.gameSummary
      const all_events = message.sgfEvents.slice(1).filter((ob)=>ob.type=='PROP_GROUP_ADDED')
      const sgfEvents:{
        events:FetchedEvent[]
        points:FetchedEvent[]
      } = {
        events:[],
        points:[],
      }
      all_events.forEach((ob)=>{
        ob.props.forEach((prop)=>{
          if(associated_keys.hasOwnProperty(prop.name)){
            sgfEvents[associated_keys[prop.name as 'MOVE' | 'TERRITORY'] as 'events'|'points'].push({
              position: typeof prop.loc === 'object'? Object.values(prop.loc) as [number, number] : prop.loc,
              color:prop.color
            })
          }
        })
      })
      const res:IFetchedGame = {
        gameSummary: Object.fromEntries(game_summary_keys.map((key)=>[key,gameSummary[key]])) as GameSummaryT,
        ...sgfEvents
      }
      await iDB.put('game',{
        timestamp:lastTimestamp,
        ...res
      })
    }
    else if(isGameJoin(message)){
      const lastTimestamps = await get<string[]>('timestamp_query')
      const lastTimestamp = lastTimestamps![0]
      set('timestamp_query',lastTimestamps!.slice(1))
      const gameSummary = message.gameSummary
      let newGameSummary:GameSummaryT = {...gameSummary,...gameSummary.players}
      const all_events = message.sgfEvents.slice(1).filter((ob)=>ob.type=='PROP_GROUP_ADDED')
      const game_summary_keys:['gameType','komi','size','white','black'] = ['gameType','komi','size','white','black']
      const associated_keys ={
        MOVE:'events',
	      TERRITORY:'points'
      }
      newGameSummary = Object.fromEntries(game_summary_keys.map((key)=>[key,newGameSummary[key]])) as GameSummaryT

      const sgfEvents:{
        events:FetchedEvent[]
        points:FetchedEvent[]
      }= {
        events:[],
        points:[],
      }
      all_events.forEach((ob)=>{
        ob.props.forEach((prop)=>{
          if(associated_keys.hasOwnProperty(prop.name)){
            sgfEvents[associated_keys[prop.name as 'MOVE' | 'TERRITORY'] as 'events'|'points'].push({
              position: typeof prop.loc === 'object'? Object.values(prop.loc) as [number, number] : prop.loc,
              color:prop.color
            })
          }
        })
      })
      const ans = {
        gameSummary,
        ...sgfEvents
      }
      set(`game_${lastTimestamp}`,ans)
    }
  }
}
