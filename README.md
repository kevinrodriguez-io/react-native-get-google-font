# React Native Get Google Font

![GIF](https://user-images.githubusercontent.com/6248571/108169302-244c2800-70be-11eb-8461-7e16b0cb1600.gif)

<p align="center">
  <a href="https://github.com/kevinrodriguez-io/react-native-get-google-font/watchers"><img src="https://img.shields.io/github/watchers/kevinrodriguez-io/react-native-get-google-font?style=social" alt="Watch on GitHub" /></a>
  <a href="https://github.com/kevinrodriguez-io/react-native-get-google-font/stargazers"><img src="https://img.shields.io/github/stars/kevinrodriguez-io/react-native-get-google-font?style=social" alt="Star on GitHub" /></a>
  <a href="https://twitter.com/intent/tweet?text=Check out react-native-get-google-font, a little dev-tool to add google fonts to bare react-native projects. https://github.com/kevinrodriguez-io/react-native-get-google-font"><img src="https://img.shields.io/twitter/url/https/github.com/kevinrodriguez-io/react-native-get-google-font.svg?style=social" alt="Tweet!" /></a>
</p>

![Google Fonts Image](https://images.unsplash.com/photo-1511296265581-c2450046447d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1700&h=500&q=80)

## Summary

I made this package for those who don't want to introduce an extra "loading" state for their applications or having to go
ahead and setup the splashscreen and Apploading components.

What this little helper tool does is:

1. Grabs the fonts from Github.
2. Puts them under assets/fonts.
3. Renames the fonts to match apple postscript so you can have only one style `fontFamily` per platform (except web, maybe).
4. Optionally runs `react-native link` to link the assets, creating react-native.config.js if it doesn't exists (RN >= 60).
5. Creates a little guide on how to use the fresh downloaded fonts.

That's it.

## Usage

1. `npx react-native-get-google-font`.
2. Provide your font name (lowercase, check packages from expo-google-fonts).
3. Create your github user token and add it on the terminal.
4. Follow the wizard steps, and enjoy dead-simple font install.
