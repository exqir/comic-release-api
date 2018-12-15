export function createLogger (context: string) {
  const logging = (method: (...args: any[]) => void) =>
    (...args: any[]) =>
    method(new Date().toISOString(), context, ...args)

  return {
    log: logging(console.log),
    info: logging(console.info),
    error: logging(console.error),
  }
}