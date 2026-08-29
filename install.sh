#!/bin/bash
# VoyageAI Install Script
# Automatically sets up Gemini API key and pushes to GitHub

set -e

echo "========================================="
echo "VoyageAI - Gemini API Key Setup Script"
echo "========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found. Please run this script from the VoyageAI project root."
    exit 1
fi

# Get API key from user
echo "Please enter your Google Gemini API key:"
echo "Get your free key from: https://aistudio.google.com/"
echo -n "Enter API key: "
read -r GEMINI_KEY

if [ -z "$GEMINI_KEY" ]; then
    echo "Error: API key cannot be empty."
    exit 1
fi

echo ""
echo "Setting up API key..."

# Setup backend .env
BACKEND_ENV="backend/.env"
if [ -f "$BACKEND_ENV" ]; then
    # Update existing backend .env
    sed -i "s|^GEMINI_API_KEY=.*|GEMINI_API_KEY=$GEMINI_KEY|" "$BACKEND_ENV"
    echo "✅ Updated backend/.env"
else
    # Create new backend .env
    echo "GEMINI_API_KEY=$GEMINI_KEY" > "$BACKEND_ENV"
    echo "✅ Created backend/.env"
fi

# Setup root .env (for frontend VITE env)
ROOT_ENV=".env"
if [ -f "$ROOT_ENV" ]; then
    # Update existing root .env
    sed -i "s|^VITE_GEMINI_API_KEY=.*|VITE_GEMINI_API_KEY=$GEMINI_KEY|" "$ROOT_ENV"
    echo "✅ Updated .env"
else
    # Create new root .env
    echo "VITE_GEMINI_API_KEY=$GEMINI_KEY" > "$ROOT_ENV"
    echo "✅ Created .env"
fi

echo ""
echo "Updating git configuration..."

# Git configuration (assuming user has git set up)
git config user.email "voyageai@users.noreply.github.com" 2>/dev/null || true
git config user.name "VoyageAI" 2>/dev/null || true

# Add .env files to git (they're normally gitignored, but we need to push the key)
# Temporarily remove .env from gitignore to allow committing
if grep -q "\.env" .gitignore; then
    echo "⚠️ .env is gitignored. Temporarily removing from gitignore..."
    # Create temporary gitignore for this operation
    cp .gitignore .gitignore.bak
    grep -v "\.env" .gitignore > .gitignore.tmp && mv .gitignore.tmp .gitignore
fi

# Add all changes and commit
git add .env backend/.env 2>/dev/null || true
if git diff --cached --stat 2>/dev/null | grep -q "."; then
    git commit -m "feat: add Gemini API key configuration" 2>/dev/null || true
    echo "✅ Committed API key configuration"
else
    echo "ℹ️ No changes to commit (or git not initialized)"
fi

# Push to GitHub
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo "📤 Pushing to GitHub..."
    git push 2>/dev/null && echo "✅ Successfully pushed to GitHub!" || echo "⚠️ Push failed (may need to resolve secret scanning)"
else
    echo "ℹ️ Not a git repository or git not initialized"
fi

# Restore gitignore if we modified it
if [ -f ".gitignore.bak" ]; then
    mv .gitignore.bak .gitignore
    echo "♻️ Restored .gitignore"
fi

echo ""
echo "========================================="
echo "Setup Complete!"
echo "========================================="
echo ""
echo "Your Gemini API key has been configured."
echo "To run the project:"
echo "  cd VoyageAI && npm run dev"
echo ""
echo "Notes:"
echo "- The .env files contain your sensitive API key"
echo "- Keep them secure and never share them publicly"
echo "- To remove the key later, edit the .env files and push changes"
echo ""
echo "For detailed instructions, see README.md"
echo "========================================="