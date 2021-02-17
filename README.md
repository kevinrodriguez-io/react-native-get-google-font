# React Native Get Google Font

![Google Fonts Image](https://images.unsplash.com/photo-1511296265581-c2450046447d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1700&h=500&q=80)

## Summary

I made this package because for those who don't want to introduce an extra "loading" state for their applications, having to go
ahead and setup the splashscreen and Apploading components.

What this little helper tool does is:

1. Grabs the fonts from Github.
2. Puts them under assets/fonts.
3. Renames the fonts to match apple postscript so you can have only one style `fontFamily` per platform (except web, maybe).
4. Optionally runs `react-native link` to link the assets, creating react-native.config.js if it doesn't exists (RN >= 60).
5. Creates a little guide on how to use the fresh downloaded fonts.

That's it.

## Usage

`npx react-native-get-google-font`