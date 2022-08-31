import {expect, test} from '@oclif/test'

describe('stagelib', () => {
  test
  .stdout()
  .command(['stagelib'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['stagelib', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
