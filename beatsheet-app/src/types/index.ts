export type TNewAct = {
  name: string
}

export type TAct = TNewAct & { 
  id: number 
}

export type TNewBeat = {
  name: string
  time: string
  cameraAngle: string
  content: string
  notes: string
}

export type TBeat = TNewBeat & {
  id: number
}
