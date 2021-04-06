import { set, get } from 'idb-keyval'
import { RequestTypes } from '@type/fetch'
import { DoRequest } from '@hooks/useAPI'
import { RoomLoadGameRequest } from '@type/requests'

export const getGame = async (doRequest: DoRequest, gameTimestamp: string) => {
  let gameAns = await get(`game_${gameTimestamp}`)
  if (gameAns) {
    return gameAns
  } else {
    let lastTimestamps = await get<string[]>('timestamp_query')
    lastTimestamps = lastTimestamps || []
    lastTimestamps.push(gameTimestamp)
    await set('timestamp_query', lastTimestamps)
    await doRequest<RoomLoadGameRequest>({
      type: RequestTypes.roomLoadGame,
      channelId: 5,
      timestamp: gameTimestamp,
    })
    gameAns = await get(`game_${gameTimestamp}`)
    while (!gameAns) {
      gameAns = await get(`game_${gameTimestamp}`)
    }
    return gameAns
  }
}
