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


## Features Implemented for assignment2

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



## Features Implemented for assignment3

### Camera Integration
- [x] 5%  **Permissions:** The app requests and handles permission for both the device camera and photo gallery.
- [x] 10% **Capture & Pick:** Users can either take a new photo directly in the app or choose an existing image from the gallery.
- [x] 5%  **Preview:** The selected image is displayed in the note window as a preview before the user confirms saving/uploading.

### Storage & Validation
- [x] 10% **Client-side Validation:** The app validates that the image file is under 15MB and in JPG, PNG, or WebP format before upload.
- [x] 10% **Supabase Upload:** Images are securely uploaded to Supabase Storage with unique file names to avoid overwriting other users’ images.
- [x] 5%  **DB Linking:** The URL of the uploaded image is stored in the notes table and linked to the correct note.

### UI / UX (Images & Feedback)
- [x] 10% **Loading States:** A spinner or progress indicator shows when an image is uploading, and the save button is disabled during the process.
- [x] 10% **Aspect Ratio Handling:** Images displayed in the "Jobb Notater" screen scale properly and maintain their aspect ratio without stretching.
- [x] 10% **Error Messaging:** Clear error messages are shown if the image is too large, has the wrong format, or if the upload fails.

### Notifications
- [x] 5% **System Permissions:** The app requests permission from the operating system to send notifications.

#### Trigger Logic (15% total – choose one)
- [x] 5% **Local Trigger:** The app sends a notification only to the user who presses "Save".  
  The notification logic runs in the app after a successful `supabase.insert`.
- [] 15% **Cloud / Edge Trigger:** When an employee creates a note, all other employees receive a notification.  
  This is implemented using Supabase Webhooks and an Edge Function.

- [x] 5% **Content Injection:** The notification includes the title of the created 
note (e.g., "New note: [Note Title]").