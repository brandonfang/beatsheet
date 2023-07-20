import { TAct, TBeat } from '@/types'

const apiUrl = 'http://localhost:8080'

export async function getActs() {
  const res = await fetch(`${apiUrl}/acts`, { cache: 'no-store' })
  const data = await res.json()
  return data
}

export async function createAct(act: TAct) {
  const res = await fetch(`${apiUrl}/acts/`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(act),
  })
  const data = await res.json()
  return data
}

export async function updateAct(act: TAct) {
  const res = await fetch(`${apiUrl}/acts/${act.id}`, {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(act),
  })
  const data = await res.json()
  return data
}

export async function deleteAct(actId: string) {
  const res = await fetch(`${apiUrl}/acts/${actId}`, {
    method: 'DELETE',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
  return data
}

export async function getBeats(actId: number) {
  const res = await fetch(`${apiUrl}/acts/${actId}/beats`, {
    cache: 'no-store',
  })
  const data = await res.json()
  return data
}

export async function getBeat(beatId: string) {
  const res = await fetch(`${apiUrl}/beats/${beatId}`, {
    cache: 'no-store',
  })
  const data = await res.json()
  return data
}

export async function createBeat(act: TAct, beat: TBeat) {
  const res = await fetch(`${apiUrl}/acts/${act.id}/beats`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(beat),
  })
  const data = await res.json()
  return data
}

export async function editBeat(beat: TBeat) {
  const res = await fetch(`${apiUrl}/acts/beats/${beat.id}`, {
    method: 'PUT',
    cache: 'no-store',
    mode: 'cors',
    credentials: 'same-origin',

    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(beat),
  })
  const data = await res.json()
  return data
}

export async function deleteBeat(beatId: string) {
  const res = await fetch(`${apiUrl}/acts/beats${beatId}`, {
    method: 'DELETE',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
  return data
}
