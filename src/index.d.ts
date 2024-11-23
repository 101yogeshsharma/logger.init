declare module 'Logger' {
  interface Logger {
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    fatal(message: string): void;
  }

  const logger: Logger;
  export default logger;
}
