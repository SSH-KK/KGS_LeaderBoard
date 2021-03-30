export type LastGameT = {
    gameType: string
    score: string
    komi: number
    size: number
    players: {
      white: {
        name: string
        flags: string
        rank: string
      }
      black: {
        name: string
        flags: string
        rank: string
      }
    }
    handicap: number
    timestamp: Date
}

export type sgfEventPropT = [
    {
    loc:{
        x: number
        y: number
    }
    color: string
    name: string
    },
    {
        color: string
        name: string
        float: number
        int: number
    }
]

export type sgfeventT = {
    type: string
    nodeId: number
    props: sgfEventPropT
}

export type GameInfoT = {
    gameSummary:any
    sgfEvents:sgfeventT[]
}