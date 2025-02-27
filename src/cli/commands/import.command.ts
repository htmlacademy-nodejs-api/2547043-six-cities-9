import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { Command } from './command.interface.js';

import { Styles } from '../../shared/libs/chalk-styles/chalk-styles.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filepath] = parameters;
    try {
      if (filepath === undefined) {
        throw new Error(Styles.error('file path required'));
      }
      const fileReader = new TSVFileReader(filepath.trim());
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err: unknown) {
      if (!(err instanceof Error)) {
        throw err;
      }
      console.error(Styles.error(`Can't import data from file: ${filepath}`));
      console.error(Styles.error(`Details: ${err.message}`));
    }
  }
}
