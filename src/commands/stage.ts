import {Command, Flags} from '@oclif/core'
import * as fs from 'fs'
import * as archiver from 'archiver'
import axios from 'axios'
//import * as FormData from 'form-data'
const FormData = require('form-data')
import { resolve } from 'path'
//import * as concat from 'concat-stream'
const concat = require('concat-stream')

/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
function zipDirectory(sourceDir: string, outPath: string): Promise<void> {
  const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', err => reject(err))
      .pipe(stream)
    ;

    stream.on('close', () => resolve());
    archive.finalize();
    resolve()
  });
}

export default class Stage extends Command {
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
    /*
    const {args, flags} = await this.parse(Stage)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /home/hh/uploaddir/src/commands/stage.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
    */

    /*
    const output = fs.createWriteStream('target.zip')
    const dist = archiver('zip')

    output.on('close', () => {
      console.log(dist.pointer() + ' total bytes');
    });

    dist.on('error', (err) => {
      throw err;
    });

    dist.pipe(output);
    dist.directory('src', false);
    dist.directory('subdir/', 'new-subdir');

    dist.finalize();
    */


    try {
      const aa = await zipDirectory('src', 'target31.zip')

      const url = 'https://wwbim.com/deploy/stage'

      const upload = async () => {
        try {
          const file = fs.createReadStream('target30.zip');
          const title = 'My file';

          const form = new FormData();
          form.append('title', title);
          form.append('file', file);

          const resp = await axios.post(url, form, {
            headers: {
              ...form.getHeaders(),
            }
          });

          if (resp.status === 200) {
            return 'Upload complete';
          }
        } catch(err: any) {
          return new Error(err.message);
        }
      }

      upload().then(resp => console.log(resp));


      /*
      const fd = new FormData();
      fd.append("hello", "world")
      fd.append("file", fs.createReadStream('target30.zip'))
      fd.pipe(concat((data: any) => {
        axios.post(url, data, {
          headers: fd.getHeaders()
        })
      }))
      */

      /*
      form.append('field', fs.createReadStream('/home/hh/uploaddir/target30.zip'), 'target33.zip');

      const request_config = {
        headers: form.getHeaders()
      };

      await axios.post(url, form, request_config);
      */


      /*
      var newFile = fs.createReadStream('./target30.zip');
      // personally I'd function out the inner body here and just call 
      // to the function and pass in the newFile
      newFile.on('end', async function() {
        console.log('adfadf30')
        const form_data = new FormData();
        form_data.append("file", newFile, "target.zip");
        //const request_config = {
        //  method: "post",
        //  url: url,
        //  headers: {
        //      "Content-Type": "multipart/form-data"
        //  },
        //  data: form_data
        //};
        //return axios(request_config);
        await axios.post('https://wwbim.com/deploy/stage', newFile, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
      });
      */


      /*
      //const theFile = await fs.readFile('target29.zip', () => {})
      const theFile = await fs.createReadStream('target30.zip')


      let formData = new FormData();
      formData.append("file", theFile, 'target30.zip');
      await axios.post('https://wwbim.com/deploy/stage', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      //await axios.post('https://wwbim.com/internal/deploystage', formData, {
      //  headers: {
      //    "Content-Type": "multipart/form-data",
      //  }
      //});
      */

      this.log('yes, here is the stage command')
    } catch (err) {
      //this.error(err)
      this.log('yes, here is the stage command')
    }
  }
}
