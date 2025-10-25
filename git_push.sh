#!/bin/bash

# -----------------------------
# Git Bash Auto Commit & Push Script
# -----------------------------

# Navigate to the script's directory
cd "$(dirname "$0")"

# Check current branch
BRANCH=$(git branch --show-current)

# If no branch, create main
if [ -z "$BRANCH" ]; then
    git branch -M main
    BRANCH="main"
fi

# Stage all changes
git add .

# Ask user for a commit message
echo "Enter commit message:"
read COMMIT_MSG

# If empty message, use default
if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Update project"
fi

# Commit changes
git commit -m "$COMMIT_MSG"

# Push to remote
git push origin "$BRANCH"

echo "✅ Changes pushed to GitHub on branch '$BRANCH'."
