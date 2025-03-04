'use server'

export async function action() {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}
