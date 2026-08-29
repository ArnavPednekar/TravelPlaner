## Quick Setup Script

We've created an automated install script to make configuring your Gemini API key easy.

### Option A: Automated Setup (Recommended - Cross-Platform)

#### For macOS / Linux Users:
```bash
git clone https://github.com/ArnavPednekar/TravelPlaner.git
cd VoyageAI
chmod +x install.sh
./install.sh     # Enter your key when prompted
npm run dev      # Start the project
```

#### For Windows Users:
Windows users have two options:

**Option A1: Using Git Bash (Recommended)**
1. Install [Git for Windows](https://git-scm.com/download/win) (includes Git Bash)
2. Open "Git Bash" terminal
3. Run:
   ```bash
   git clone https://github.com/ArnavPednekar/TravelPlaner.git
   cd VoyageAI
   chmod +x install.sh
   ./install.sh     # Enter your key when prompted
   npm run dev      # Start the project
   ```

**Option A2: Using WSL (Windows Subsystem for Linux)**
1. Enable [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install)
2. Install a Linux distro (Ubuntu, Debian, etc.) from Microsoft Store
3. Open the Linux terminal
4. Run:
   ```bash
   git clone https://github.com/ArnavPednekar/TravelPlaner.git
   cd VoyageAI
   chmod +x install.sh
   ./install.sh     # Enter your key when prompted
   npm run dev      # Start the project
   ```

**Option A3: Manual Windows (PowerShell/CMD)**
If you prefer not to use bash, you can manually configure the environment variables:

1. Clone the repository
2. Copy environment examples:
   ```powershell
   Copy-Item backend\.env.example backend\.env
   Copy-Item .env.example .env
   ```
3. Edit the files to add your Gemini API key:
   - Right-click This PC → Properties → Advanced system settings → Environment Variables
   - Or edit the files directly with Notepad
   - Add `GEMINI_API_KEY=your_key_here` to `backend\.env`
   - Add `VITE_GEMINI_API_KEY=your_key_here` to `.env`

### Option B: No API Key (Static Mode)
Skip the key setup entirely and use the built-in static itinerary generator. All features work except AI-powered dynamic generation.

---

### How to Get Your Gemini API Key
1. Visit: https://aistudio.google.com/
2. Sign in with your Google account
3. Click "Create API Key" or "Get API key"
4. Copy the key
5. Use it in the setup steps above

### Running the Project (All Platforms)
After setup, start the project:
```bash
npm run dev
```
This starts:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001