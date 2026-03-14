# FastNotes – React Native Application

FastNotes is a mobile note-taking application built with **React Native using Expo** and **Supabase** as backend.
The application allows users to authenticate, create notes, attach images, and manage notes collaboratively.

This README describes how to **set up, run, test, and build the application from source code**.

Github repository:
https://github.com/YasminSaeed95/fast_notes_RN

---

# Project Overview

FastNotes allows users to:

* Sign up and log in
* Create, read, update, and delete notes
* Upload images using camera or gallery
* Store images securely in Supabase Storage
* Receive notifications when creating notes
* Load notes efficiently using pagination

--- 

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


## Assignment4:
Before building or running the project, ensure the following software is installed:

* **Node.js** (version 18 or newer recommended)
* **npm** (comes with Node.js)
* **Expo CLI**

```bash
npm install -g expo-cli
```

* **EAS CLI** (for building APK)

```bash
npm install -g eas-cli
```

* **Android Studio** (for emulator testing)
* **Git**
* Optional: **Physical Android device**

---

# Project Setup

## 1. Clone the repository

```bash
git clone https://github.com/YasminSaeed95/fast_notes_RN.git

```
Branch for this assignment:
fast_notes_4

## 2. Navigate to the project folder

```bash
cd fast_notes_RN
```

## 3. Install dependencies

```bash
npm install
```

---

# Running the Application

Start the Expo development server:

```bash
npx expo start
```

After starting the server you can run the app using:

* Android emulator
* iOS simulator
* Physical device using **Expo Go**

Expo will show a QR code which can be scanned with the Expo Go app or write a localhost.

---

# Building the Android Application (APK)

To generate a runnable Android build:

### Step 1 – Login to Expo

```bash
eas login
```

### Step 2 – Start Android build

```bash
eas build --platform android --profile development
```

### Step 3 – Download the APK

After the build completes:

* Expo provides a **download link**
* The APK can be installed on:

  * Android emulator
  * physical Android devices

Build time normally takes **5–10 minutes**.

---

# Running on Android

## Android Emulator

1. Install **Android Studio**
2. Open **AVD Manager**
3. Create a new device (example: Pixel 7 API 35)
4. Start the emulator
5. Install the generated APK

---

## Physical Android Device using WIFI

1. Ensure computer and device are on the same network
2. Enable **ADB over Wi-Fi**
3. Install the APK wirelessly

---

# Testing

The application includes automated tests written with:

* **Jest**
* **React Native Testing Library**

Run the tests with:

```bash
npm test
```

---

## Features Implemented for assignment4:

## 1. Testing Suite (35%) ✅

###✅ (10%)  Unit Test – Create Note & Navigation

A unit test verifies that:

* A valid note can be submitted
* The creation logic executes
* The user is navigated back to the main screen

The test uses:

* `fireEvent.press`
* navigation mock

---

###✅(15%) Integration Test – Loader & Database Mock 

An integration test simulates a database request.

The test verifies that:

* A loading spinner appears while notes are loading
* The loader disappears when notes are fetched

This test uses:

* `jest.mock`
* `waitFor`

---

###✅ (10%) Auth Guard Test – Access Control 

The test ensures protected content is not accessible when the user is not logged in.

If the session is `null`, the main content is not rendered.

---

# 2. Production Readiness & Optimization (40%) ✅

 ##✅ (10%) Log Cleanup 

All `console.log` statements have been removed from the final code to ensure a clean and professional codebase.

---

##✅ (10%) Resource Management – Camera 

Camera components are managed so they do **not run in the background**.

This is handled using:

```
useIsFocused()
```

The camera component is paused or unmounted when the screen loses focus.

---

## Pagination (Scaling)

###✅ (10%) Initial Note Loading

The application only loads **5 notes initially** from the database to improve performance.

Supabase query example:

```
.range(0,4)
```

---

###✅ (10%) Load More Button 

A **Load More** button allows users to load the next set of notes.

The query uses Supabase pagination:

```
.range(start, end)
```

Example:

Page 1 → notes 1-5
Page 2 → notes 6-10

This ensures efficient loading when the database grows.

---

### Build & Dokumentasjon (25%) ✅

 ✅ (10%) App File (APK) 
 ✅ (15%) Build-documentation (README) 

# Features Implemented

## Authentication

* User sign-up
* Login and logout
* Session persistence
* Email verification template

---

## Notes Management

Users can:

* Create notes
* Read notes from all users
* Update their own notes
* Delete their own notes

Validation prevents empty title or text fields.

---

## Camera & Image Upload

Users can:

* Take a photo with the device camera
* Select images from the gallery
* Preview images before uploading

Images are validated before upload:

* Maximum size: **15 MB**
* Allowed formats:

  * JPG
  * PNG
  * WebP

Images are uploaded to **Supabase Storage** and linked to the correct note.

---

## Notifications

The app requests permission for system notifications.

When a note is successfully created, the user receives a **local notification** containing the note title.

Example:

```
New note: [Note Title]
```

---

# Technologies Used

* React Native
* Expo
* Supabase
* TypeScript
* Jest
* React Native Testing Library

---

