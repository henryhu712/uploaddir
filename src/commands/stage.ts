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
  console.log('正在压缩文件夹', sourceDir, '...')

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
    //resolve()
  });
}

export default class Stage extends Command {
  static description = '自动部署vue，modelslib'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    dir: Flags.string({char: 'd', description: '设置要上传的文件夹，默认文件夹为dist。'}),
    // flag with no value (-f, --force)
    //force: Flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Stage)

    let targetDir = flags.dir ? flags.dir : 'dist'
    let targetFile = `${targetDir}.zip`

    //console.log('args: ', args)
    //console.log('flags: ', flags)
    //if (flags.dir) {
    //  targetDir = flags.dir
    //}

    // 检查文件夹是否存在
    if (!fs.existsSync(targetDir)) {
      console.log(`文件夹 ${targetDir} 不存在！终止上传。`)
      return
    }

    // 删除临时文件
    if (fs.existsSync(targetFile)) {
      fs.unlinkSync(targetFile)
    }

    /*
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
      await zipDirectory(targetDir, targetFile)
      console.log('压缩文件夹完成！')

      const url = 'https://wwbim.com/deploy/stage'

      const upload = async () => {
        try {
          //targetFile = 'dist2.zip'
          const file = await fs.createReadStream(targetFile);
          const secret = 'kfi8i#W0df';

          const form = new FormData();
          form.append('secret', secret);
          form.append('file', file);

          console.log('正在上传文件...')
          const resp = await axios.post(url, form, {
            'maxBodyLength': Infinity,
            'maxContentLength': Infinity,
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

      upload().then(resp => console.log('上传完成！'));


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

      //this.log('yes, here is the stage command')
    } catch (err) {
      //this.error(err)
      this.log('yes, here is the stage command')
    }
  }
}
