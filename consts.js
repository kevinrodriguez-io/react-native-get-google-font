const README_LINE =
  '"- `Stylesheet.create({ someText: { fontFamily: "{0}" }});`\n'
const GITHUB_FONT_DIRECTORY_URL =
  'https://api.github.com/repos/expo/google-fonts/git/trees/master?recursive=1'
const DOWNLOADS_FOLDER = 'TEMP_FONT_DOWNLOADS'
const RN_CONFIG_FILE_NAME = 'react-native.config.js'
const RN_CONFIG_FILE_CONTENTS =
  'module.exports = { project: { ios: {}, android: {} }, assets: ["./assets/fonts/"] };'
const FONTS_README = 'FONTS-README.md'

const ALL_DONE = 'All done 🚀'
const CHECKING_FONTS_README_EXISTS = `Checking ${FONTS_README} exists.`
const REMOVING_EXISTING_FONTS_README = `Removing existing ${FONTS_README}`
const REMOVED_EXISTING_FONTS_README = `Removed existing ${FONTS_README}`
const CREATING_FONTS_README = `Creating ${FONTS_README}`
const CREATED_FONTS_README = `Created ${FONTS_README}`
const DISPLAYING_FONTS_README_CONTENTS = 'Displaying FONTS-README contents: \n'
const ABORTED_DUE_TO_EXCEPTION = 'Aborted due to exception.'
const CREATING_FOLDER = 'Creating folder.'
const REMOVING_EXISTING_FOLDER = 'Removing existing folder.'
const GITHUB_PERSONAL_TOKEN_INSTRUCTION = 'Github personal access token'
const GITHUB_PERSONAL_TOKEN_HINT =
  'Insert your github token (https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)'
const CHECKING_RN_CONFIG_EXISTS = 'Checking if react-native.config.js exists.'
const CREATING_RN_CONFIG = 'Creating react-native.config.js'
const FONT_NAME_INSTRUCTION = 'Font name'
const FONT_NAME_HINT =
  'Please use the package font-name: IE open-sans (Instead of Open Sans).'

const README_INSTRUCTION =
  'Do you want a FONTS-README.md file containing some usage instructions? (This will overwrite any existing file with that name).'

const NPX_INSTEAD_OF_YARN_CONFIRMATION =
  'Do you want to use NPX instead of yarn to run react-native link?'
const REACT_NATIVE_LINK_INSTRUCTION =
  'Do you want to run yarn react-native link (This will copy the fonts to their respective android/ios projects and make them work for you) [This process is irreversible, please commit your changes first].'
const REMOVING_TEMPORARY_FOLDER = 'Removing temporary folder.'
const REMOVED_TEMPORARY_FOLDER = 'Removed temporary folder.'
const GETTING_FONTS_DIRECTORY = 'Getting fonts directory from Github.'
const GETTING_IOS_POSTSCRIPT_NAME = 'Getting iOS postscript font-name for'
const LOADED_FONTS_DIRECTORY = 'Loaded fonts directory from Github'
const DOWNLOADING_FONT = 'Downloading font'
const DOWNLOADED = 'Downloaded'
const WRITING_FONT = 'Writing font'
const CHECKING_DESTINATION_EXISTS = 'Checking if assets/fonts exists.'
const CREATING_DESTINATION_FOLDER = 'Creating assets/fonts folder.'
const FONT_EXISTS = 'already exists in /assets/fonts, skipping.'
const REACT_NATIVE_LINK = 'react-native link'
const RUNNING_REACT_NATIVE_LINK = `Running: ${REACT_NATIVE_LINK}`
const REACT_NATIVE_LINK_SUCCESS = `Successfully ran ${REACT_NATIVE_LINK}`
const REACT_NATIVE_LINK_ERROR = `Error running ${REACT_NATIVE_LINK}`

module.exports = {
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
}
