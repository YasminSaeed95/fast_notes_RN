# Welcome to your FastNotes app 👋

FastNotes is a personal note-taking app built with **React Native** using **Expo**.  
The app allows users to create, view, and manage notes easily.

## Features

- **Home Screen:** Displays a list of all notes.
- **Note Titles:** Each note in the list shows its title.
- **Add Note:** Button to create a new note placed in an accessible area ("thumb zone").
- **New Note Screen:** Enter title and content for a note, keyboard-friendly layout.
- **Note Detail Screen:** View the title and content of a selected note.
- **Back Navigation:** Automatic back button to return to the Home Screen.
- **Simple UI:** Notes displayed in clean boxes with padding and shadow.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Open the app
In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start editing the app by modifying files inside the app directory. This project uses file-based routing.

## Reset to a fresh project

If you want to start from a clean app template, run:

```bash
npm run reset-project
```

This will move the current starter code to app-example and create a new blank app directory.

## Notes on Functionality

1- The app is fully runnable using Expo.
2- Notes are stored in memory, so adding a new note updates the list immediately.
3- Automatic back navigation works on all screens.
4- The UI is designed to be intuitive and responsive on both Android and iOS devices.

## Screens included:

Home Screen (list of notes)
New Note Screen (add title and content)
Note Detail Screen (view note)