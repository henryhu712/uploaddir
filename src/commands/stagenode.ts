import {Command, Flags} from '@oclif/core'
import axios from 'axios'

export default class Stagenode extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Stagenode)

    try {
      const url = 'https://wwbim.com/deploy/stagenode'
      const resp = await axios.get(url)
    } catch(err: any) {
      //return new Error(err.message);
    }
  }
}
