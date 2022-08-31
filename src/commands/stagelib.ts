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
function zipDirectory1(sourceDir: string, outPath: string): Promise<void> {
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

export default class Stagelib extends Command {
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
    const {args, flags} = await this.parse(Stagelib)

    let targetDir = flags.dir ? flags.dir : 'dist'
    let targetFile = `${targetDir}.zip`

    // 检查文件夹是否存在
    if (!fs.existsSync(targetDir)) {
      console.log(`文件夹 ${targetDir} 不存在！终止上传。`)
      return
    }

    // 删除临时文件
    if (fs.existsSync(targetFile)) {
      fs.unlinkSync(targetFile)
    }

    try {
      await zipDirectory1(targetDir, targetFile)
      console.log('压缩文件夹完成！')

      const url = 'https://wwbim.com/deploy/stagelib'

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
    } catch (err) {
      //this.error(err)
      this.log('yes, here is the stage command')
    }
  }
}
