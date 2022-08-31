import {expect, test} from '@oclif/test'

describe('stagenode', () => {
  test
  .stdout()
  .command(['stagenode'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['stagenode', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
