# Welcome to your FastNotes app 👋

FastNotes is a personal note-taking app built with **React Native** using **Expo** with Supabase backend.
This app  allows users to sign up, log in, and manage notes collaboratively (create, read, update, delete).  

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


## Features Implemented

### Authentication
- [x] 10% **Sign-up:** Users can create an account with email/password.  
- [x] 10% **Email template:** Customized Supabase email confirmation template for sign-up.  
- [x] 10% **Login/Logout:** Users must log in to access the app.  
- [x] 5%  **Persisted credentials:** Logged-in users remain logged in securely.  

### Database & Notes
- [x] 5%  **Auth connection:** Only logged-in users can access the database.  
- [x] 10% **Create:** Add new notes with Title, Text, User, and timestamp.  
- [x] 10% **Read:** All notes from all users are visible on "Jobb Notater" screen.  
- [x] 10% **Update:** Users can update their own notes.  
- [x] 10% **Delete:** Users can delete their own notes (with confirmation).  

### Validation
- [x] 5% **No empty fields in notes:** Title and text cannot be empty when creating/updating notes.  
- [x] 5% **No empty fields in sign-up/login:** Email, password cannot be empty.  
- [x] 5% **Success messages:** Users receive confirmation when operations are completed (add/update/delete notes).  

### UI / UX
- [x] Login screen with option to navigate to Sign-up.  
- [x] Sign-up screen with option to navigate back to Login.  
- [x] Floating "Add Note" button on My Notes screen.  
- [x] Note Detail screen with Update and Delete buttons.  

### Visualizations
- [x] 5% **ER-Diagram:** Shows database structure (auth, notes, profiles, etc.) – include as PDF/PNG/JPG.  
- [x] 5% **Sequence Diagram:** Shows interaction between app and database when creating a note – include as PDF/PNG/JPG.  

## Known Issues / Notes
- Email confirmation link may expire quickly if not clicked immediately.  

