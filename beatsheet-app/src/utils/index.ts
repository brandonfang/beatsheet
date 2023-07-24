import { TAct, TBeat, TNewAct, TNewBeat } from '@/types'

const apiUrl = 'http://localhost:8080'

export async function getActs() {
  try {
    const res = await fetch(`${apiUrl}/acts`, { cache: 'no-store' })
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function createAct(act: TNewAct) {
  try {
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
  } catch (error) {
    console.error(error)
  }
}

export async function deleteAct(actId: number) {
  try {
    await fetch(`${apiUrl}/acts/${actId}`, {
      method: 'DELETE',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // No API response
  } catch (error) {
    console.error(error)
  }
}

export async function getBeats(actId: number) {
  try {
    const res = await fetch(`${apiUrl}/acts/${actId}/beats`, {
      cache: 'no-store',
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function getBeat(beatId: number) {
  try {
    const res = await fetch(`${apiUrl}/beats/${beatId}`, {
      cache: 'no-store',
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function createBeat(act: TAct, beat: TNewBeat) {
  try {
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
  } catch (error) {
    console.error(error)
  }
}

export async function editBeat(beat: TBeat) {
  try {
    await fetch(`${apiUrl}/acts/beats/${beat.id}`, {
      method: 'PUT',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(beat),
    })
    // No API response
  } catch (error) {
    console.error(error)
  }
}

export async function deleteBeat(actId: number, beatId: number) {
  try {
    await fetch(`${apiUrl}/acts/${actId}/beats/${beatId}`, {
      method: 'DELETE',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // No API response
  } catch (error) {
    console.error(error)
  }
}
