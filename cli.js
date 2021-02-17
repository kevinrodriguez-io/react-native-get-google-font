#!/usr/bin/env node

const { cwd, exit } = require('process')
const fs = require('fs')
const path = require('path')
const prompts = require('prompts')
const childProcess = require('child_process')
const { promisify } = require('util')

const { default: axios } = require('axios')
const marked = require('marked')
const TerminalRenderer = require('marked-terminal')
const ora = require('ora')
const rmfr = require('rmfr')

const {
  DOWNLOADS_FOLDER,
  CREATING_FOLDER,
  REMOVING_EXISTING_FOLDER,
  GITHUB_PERSONAL_TOKEN_INSTRUCTION,
  FONT_NAME_INSTRUCTION,
  FONT_NAME_HINT,
  README_INSTRUCTION,
  GETTING_FONTS_DIRECTORY,
  GITHUB_FONT_DIRECTORY_URL,
  LOADED_FONTS_DIRECTORY,
  DOWNLOADING_FONT,
  DOWNLOADED,
  WRITING_FONT,
  REACT_NATIVE_LINK_INSTRUCTION,
  GITHUB_PERSONAL_TOKEN_HINT,
  CHECKING_DESTINATION_EXISTS,
  GETTING_IOS_POSTSCRIPT_NAME,
  CREATING_DESTINATION_FOLDER,
  FONT_EXISTS,
  README_LINE,
  REMOVING_TEMPORARY_FOLDER,
  REMOVED_TEMPORARY_FOLDER,
  ABORTED_DUE_TO_EXCEPTION,
  CHECKING_RN_CONFIG_EXISTS,
  CREATING_RN_CONFIG,
  RN_CONFIG_FILE_NAME,
  RN_CONFIG_FILE_CONTENTS,
  RUNNING_REACT_NATIVE_LINK,
  REACT_NATIVE_LINK,
  REACT_NATIVE_LINK_SUCCESS,
  REACT_NATIVE_LINK_ERROR,
  FONTS_README,
  CHECKING_FONTS_README_EXISTS,
  REMOVING_EXISTING_FONTS_README,
  REMOVED_EXISTING_FONTS_README,
  CREATING_FONTS_README,
  CREATED_FONTS_README,
  DISPLAYING_FONTS_README_CONTENTS,
  ALL_DONE,
  NPX_INSTEAD_OF_YARN_CONFIRMATION,
} = require('./consts')

const access = promisify(fs.access)
const mkdir = promisify(fs.mkdir)
const writeFile = promisify(fs.writeFile)
const rename = promisify(fs.rename)
const exec = promisify(childProcess.exec)

const createOrReCreateFolder = async (folder, spinner = ora()) => {
  try {
    spinner.start(CREATING_FOLDER)
    await mkdir(folder)
  } catch (error) {
    if (error.code === 'EEXIST') {
      spinner.start(REMOVING_EXISTING_FOLDER)
      await rmfr(folder)
      spinner.start(CREATING_FOLDER)
      await mkdir(folder)
    }
  }
}

const getToken = () =>
  prompts({
    name: 'token',
    type: 'invisible',
    message: GITHUB_PERSONAL_TOKEN_INSTRUCTION,
    hint: GITHUB_PERSONAL_TOKEN_HINT,
  })

const getFontName = () =>
  prompts({
    name: 'fontName',
    type: 'text',
    message: FONT_NAME_INSTRUCTION,
    hint: FONT_NAME_HINT,
  })

const getShouldCreateReadme = () =>
  prompts({
    name: 'shouldCreateReadme',
    type: 'confirm',
    message: README_INSTRUCTION,
  })

const getShouldLinkRN = () =>
  prompts({
    name: 'shouldLinkRN',
    type: 'confirm',
    message: REACT_NATIVE_LINK_INSTRUCTION,
  })

const getShouldUseNPX = () =>
  prompts({
    name: 'shouldUseNPX',
    type: 'confirm',
    message: NPX_INSTEAD_OF_YARN_CONFIRMATION,
  })

;(async () => {
  const { fontName } = await getFontName()
  const { token } = await getToken()

  if (!fontName || !token) {
    ora({
      spinner: 'dots',
      color: 'cyan',
    }).fail('Font name and token must be provided')
    throw new Error('INVALID_OPTIONS')
  }

  const api = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const spinner = ora({
    spinner: 'dots',
    color: 'cyan',
  }).start(GETTING_FONTS_DIRECTORY)

  let data
  try {
    const result = await api.get(GITHUB_FONT_DIRECTORY_URL)
    data = result.data
  } catch (error) {
    console.error(error)
    throw error
  }
  spinner.succeed(LOADED_FONTS_DIRECTORY)

  const treePathRegexp = new RegExp(`${fontName}\/`, 'i')

  const items = data.tree
    .filter((i) => treePathRegexp.test(i.path))
    .filter((i) => /\.ttf$/i.test(i.path))
    .map(({ url, path }) => ({
      url,
      fileName: path.substr(path.lastIndexOf('/') + 1, path.length),
    }))

  const downloadsFolder = path.join(cwd(), DOWNLOADS_FOLDER)
  await createOrReCreateFolder(downloadsFolder, spinner)

  let readmeContents =
    '# FONTS-README\n\nNow you can use the following fonts:\n\n'

  let shouldAbort = false
  for await (const [index, item] of items.entries()) {
    try {
      const progress = `${index + 1}/${items.length}`
      spinner.start(`${progress} - ${DOWNLOADING_FONT}: ${item.fileName}`)

      const response = await api.get(item.url)
      spinner.succeed(`${progress} - ${DOWNLOADED}: ${item.fileName}`)
      spinner.start(`${progress} - ${WRITING_FONT}: ${item.fileName}.`)

      const sourceFile = path.join(downloadsFolder, item.fileName)
      await writeFile(sourceFile, response.data.content, response.data.encoding)

      spinner.start(
        `${progress} - ${GETTING_IOS_POSTSCRIPT_NAME}: ${item.fileName}.`,
      )

      const { stdout: fontName } = await exec(
        `fc-scan --format "%{postscriptname}" ${sourceFile}`,
      )
      const assetsFontsFolder = path.join(cwd(), 'assets/fonts')

      try {
        spinner.start(CHECKING_DESTINATION_EXISTS)
        await access(assetsFontsFolder)
      } catch (error) {
        spinner.start(CREATING_DESTINATION_FOLDER)
        await mkdir(assetsFontsFolder)
      }

      const targetFile = path.join(assetsFontsFolder, `${fontName}.ttf`)
      spinner.start(
        `${progress} - Moving: ${item.fileName} to ${fontName}.ttf.`,
      )
      try {
        await access(targetFile)
        spinner.info(`${fontName} ${FONT_EXISTS}`)
      } catch (error) {
        await rename(sourceFile, targetFile)
      }
      readmeContents += README_LINE.replace('{0}', fontName)
    } catch (error) {
      console.error(error)
      shouldAbort = true
      break
    }
  }

  spinner.start(REMOVING_TEMPORARY_FOLDER)
  await rmfr(downloadsFolder)
  spinner.succeed(REMOVED_TEMPORARY_FOLDER)

  if (shouldAbort) {
    spinner.fail(ABORTED_DUE_TO_EXCEPTION)
    throw new Error(ABORTED_DUE_TO_EXCEPTION)
  }

  const { shouldLinkRN } = await getShouldLinkRN()
  if (shouldLinkRN) {
    const rnConfigFile = path.join(cwd(), RN_CONFIG_FILE_NAME)
    try {
      spinner.start(CHECKING_RN_CONFIG_EXISTS)
      await access(rnConfigFile, fs.constants.F_OK)
    } catch (error) {
      spinner.start(CREATING_RN_CONFIG)
      await writeFile(rnConfigFile, RN_CONFIG_FILE_CONTENTS)
    }
    spinner.stop()
    const { shouldUseNPX } = await getShouldUseNPX()
    spinner.start(`${RUNNING_REACT_NATIVE_LINK}`)
    try {
      const result = await exec(
        `${shouldUseNPX ? 'npx' : 'yarn'} ${REACT_NATIVE_LINK}`,
      )
      console.log('\n')
      console.log(result.stdout)
      spinner.succeed(REACT_NATIVE_LINK_SUCCESS)
    } catch (error) {
      spinner.fail(REACT_NATIVE_LINK_ERROR)
    }
  }

  const { shouldCreateReadme } = await getShouldCreateReadme()

  if (shouldCreateReadme) {
    const readmeFile = path.join(cwd(), FONTS_README)
    try {
      spinner.start(CHECKING_FONTS_README_EXISTS)
      await access(readmeFile, fs.constants.F_OK)
      spinner.start(REMOVING_EXISTING_FONTS_README)
      await rmfr(readmeFile)
      spinner.succeed(REMOVED_EXISTING_FONTS_README)
      spinner.start(CREATING_FONTS_README)
      await writeFile(readmeFile, readmeContents)
      spinner.succeed(CREATED_FONTS_README)
    } catch (error) {
      spinner.start(CREATING_FONTS_README)
      await writeFile(readmeFile, readmeContents)
      spinner.succeed(CREATED_FONTS_README)
    }
  }

  spinner.succeed(ALL_DONE)
  marked.setOptions({
    renderer: new TerminalRenderer(),
  })
  spinner.info(DISPLAYING_FONTS_README_CONTENTS)
  console.log(marked(readmeContents))
})()
  .then(() => exit(0))
  .catch(() => exit(1))
