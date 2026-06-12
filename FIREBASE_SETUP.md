# Firebase Realtime Database Setup Guide

Your portfolio now features a live, glowing visitor counter in the navigation header. By default, it operates in **LocalStorage Fallback Mode** (using realistic seeded mock data + saving your local visits) so that the application works immediately in development without any configuration.

To connect it to a real, live database for tracking real visitors on your hosted website, follow these simple steps to set up a free **Firebase Realtime Database** in under 2 minutes.

---

### Step 1: Create a Free Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** (or **Create a Project**).
3. Enter a project name (e.g., `somnath-portfolio`) and click **Continue**.
4. Disable Google Analytics for this project (not needed for the database, keeps it faster) and click **Create Project**.
5. Once your project is ready, click **Continue**.

---

### Step 2: Create the Realtime Database
1. In the left-hand sidebar under **Build**, click on **Realtime Database**.
2. Click the **Create Database** button.
3. Choose a database location close to your primary audience (e.g., *United States (us-central1)* or *Belgium (europe-west1)*) and click **Next**.
4. Select **Start in test mode** (this allows read/write access for testing) and click **Enable**.

---

### Step 3: Configure Database Rules (Security)
Since your React portfolio is a frontend-only application, it writes visits directly via HTTP requests. We need to configure the rules to allow public read/write access to the `visitors` path.

1. In the Realtime Database dashboard, click on the **Rules** tab at the top.
2. Replace the rules with the following configuration:
   ```json
   {
     "rules": {
       "visitors": {
         ".read": true,
         ".write": true,
         ".indexOn": ["timestamp"]
       }
     }
   }
   ```
3. Click the **Publish** button to save changes.

*(Note: These rules allow anyone to read and write to the `/visitors` table, which is exactly what is needed for a public page-views counter. Other parts of your database remain protected.)*

---

### Step 4: Add the URL to your Portfolio
1. Copy the Database URL from the top of the **Data** tab. It will look like this:
   `https://your-project-id-default-rtdb.firebaseio.com/`
2. Open the `.env` file in the root of your portfolio project.
3. Paste the URL into the `VITE_FIREBASE_DB_URL` variable:
   ```env
   VITE_FIREBASE_DB_URL="https://your-project-id-default-rtdb.firebaseio.com/"
   ```
4. Restart your local server (`npm run dev`) or rebuild your site (`npm run build`).

That's it! Your portfolio will now automatically record real visitor locations (using the IP Geolocation API) and display the live unique view count in the navigation header.
