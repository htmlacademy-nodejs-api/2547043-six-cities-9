import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { Command } from './command.interface.js';
import { RentalOffer } from '../../shared/libs/types/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';

import { Styles } from '../../shared/libs/chalk-styles/chalk-styles.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  private onImportedOffer(offer: RentalOffer): void {
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);
    try {
      if (filename === undefined) {
        throw new Error(Styles.error('file path required'));
      }
      fileReader.read();
    } catch (error) {

      console.error(Styles.error(`Can't import data from file: ${filename}`));
      console.error(Styles.error(`Details: ${getErrorMessage(error)}`));
    }
  }
}
