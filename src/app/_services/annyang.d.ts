declare module 'annyang' {
  type CommandOption = {
    [command: string]: (...args: string[]) => void;
  };

  interface Annyang {
    addCommands(commands: CommandOption): void;
    setLanguage(language: string): void;
    start(options?: { continuous: boolean }): void;
    abort(): void;
    addCallback(event: string, callback: (...args: any[]) => void): void;
    isListening(): boolean;
  }

  const annyang: Annyang;
  export = annyang;
}
