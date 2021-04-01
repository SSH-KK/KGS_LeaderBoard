import { PositionT } from '@type/game'

interface ICoordinateList {
  [y: number]: number[]
}

function checkIfArrayOfPositions(
  property: PositionT | PositionT[]
): property is PositionT[] {
  return property.length == 0 || Array.isArray(property[0])
}

export class CoordinateList {
  content: ICoordinateList
  constructor(initial?: PositionT[]) {
    this.content = {}

    if (initial) this.add(initial)
  }

  add(coords: PositionT | PositionT[]) {
    if (checkIfArrayOfPositions(coords))
      for (const coord of coords) this._add(coord)
    else this._add(coords)
  }

  _add([x, y]: PositionT) {
    if (this.content[y] && !this.content[y].includes(x)) this.content[y].push(x)
    else if (!this.content[y]) this.content[y] = [x]
  }

  intersection(other: CoordinateList) {
    const res: PositionT[] = []

    for (const yS in other.content)
      if (yS in this.content)
        for (const x of other.content[yS])
          if (this.content[yS].includes(x)) res.push([x, parseInt(yS)])

    return res
  }

  _diff(other: CoordinateList) {
    const res: PositionT[] = []

    for (const yS in other.content) {
      if (yS in this.content) {
        for (const x of other.content[yS])
          if (!this.content[yS].includes(x)) res.push([x, parseInt(yS)])
      } else
        res.push(
          ...other.content[yS].map<PositionT>((x) => [x, parseInt(yS)])
        )
    }

    return res
  }

  difference(other: CoordinateList): PositionT[] {
    return [...this._diff(other), ...other._diff(this)]
  }

  union(other: CoordinateList) {
    return [...this.get(), ...this._diff(other)]
  }

  get() {
    return Object.entries(this.content).flatMap(
      ([yS, row]: [string, number[]]) =>
        row.map<PositionT>((x) => [x, parseInt(yS)])
    )
  }
}
