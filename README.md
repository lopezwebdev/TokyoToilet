# Tokyo Toilet Explorer (Digital Stamp Rally)

An interactive web application and progressive web app (PWA) exploring "THE TOKYO TOILET" architectural project in Shibuya, Tokyo. Users can navigate to locations, check in with GPS verification, take photos, and track their progress in a digital stamp rally format.

## Features

-   **Interactive Map**: Powered by Leaflet, showing all 17 iconic toilet locations.
-   **GPS Check-in**: Verifies user location (within 50m) to unlock camera functionality.
-   **Camera Integration**: Custom camera interface with portrait optimization and "Test Mode" for development.
-   **Progress Tracking**: Stores compressed JPEG photos and visit completion together in IndexedDB; migrates earlier localStorage records safely.
-   **Multi-language Support**: English and Japanese (auto-detected or toggled).
-   **Responsive Design**: Mobile-first UI tailored for smartphones.

## Deployment

### Netlify (Recommended)
This project includes a `netlify.toml` for zero-configuration deployment.
1.  Push this repository to GitHub.
2.  Log in to [Netlify](https://app.netlify.com/).
3.  Click "Add new site" > "Import an existing project".
4.  Select GitHub and authorize access.
5.  Select `lopezwebdev/TokyoToilet`.
6.  Click **Deploy**.

The site will be live at a `.netlify.app` URL immediately.

### Vercel
1.  Import the GitHub repository into Vercel.
2.  Framework Preset: Vite.
3.  Deploy.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## iOS Native Wrapper (Capacitor)

This project can be wrapped as a native iOS app using Capacitor.

1.  **Prerequisites**: macOS with Xcode installed.
2.  **Sync & Open**:
    ```bash
    npm run build
    npx cap sync
    npx cap open ios
    ```
3.  **Run**: Select your connected iPhone or Simulator in Xcode and press Play.

## Technologies

-   React + Vite
-   TypeScript
-   Tailwind CSS
-   Leaflet (Maps)
-   Capacitor (Native runtime)
-   Lucide React (Icons)

## Community archive and moderation

Visitors can save photos privately or submit them for moderator review. Only approved submissions appear in the public archive. Moderator accounts use Firebase Auth custom claims; Firestore and Storage rules are included in this repository. The archive is disabled until Firebase is configured. See [Firebase setup and deployment](docs/firebase-setup.md).

```bash
npm test
npm run typecheck
npm run lint
npm run test:rules # Requires Firebase CLI and Java 21+
```

## iOS permissions

The native Info.plist includes camera and location-in-use purpose descriptions. After editing the web app, run `npm run build` and `npx cap sync ios`, then rebuild in Xcode. Camera and location behavior must be tested on a real iPhone; simulator camera availability varies. Saving progress uses the app's IndexedDB store and does not write directly to the Photos library.
# seven_years_under_your_spell
