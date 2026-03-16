#!/bin/bash
set -e

# Release script for testmachine-landing
# Usage: ./scripts/release.sh [major|minor|patch]

RELEASE_TYPE="${1:-patch}"

# Validate release type
case "$RELEASE_TYPE" in
    major|breaking)
        RELEASE_TYPE="major"
        ;;
    minor)
        RELEASE_TYPE="minor"
        ;;
    patch)
        RELEASE_TYPE="patch"
        ;;
    *)
        echo "Usage: $0 [major|minor|patch]"
        echo "  major (or breaking) - Increment major version (X.0.0)"
        echo "  minor               - Increment minor version (x.Y.0)"
        echo "  patch               - Increment patch version (x.y.Z) [default]"
        exit 1
        ;;
esac

# Get the latest tag
LATEST_TAG=$(git tag --list 'v*' | sort -V | tail -1)

if [ -z "$LATEST_TAG" ]; then
    echo "No existing tags found, starting at v0.0.0"
    LATEST_TAG="v0.0.0"
fi

echo "Current version: $LATEST_TAG"

# Parse version components (strip 'v' prefix)
VERSION="${LATEST_TAG#v}"
IFS='.' read -r MAJOR MINOR PATCH <<< "$VERSION"

# Increment based on release type
case "$RELEASE_TYPE" in
    major)
        MAJOR=$((MAJOR + 1))
        MINOR=0
        PATCH=0
        ;;
    minor)
        MINOR=$((MINOR + 1))
        PATCH=0
        ;;
    patch)
        PATCH=$((PATCH + 1))
        ;;
esac

NEW_VERSION="v${MAJOR}.${MINOR}.${PATCH}"

echo "New version: $NEW_VERSION"
echo ""

# Confirm with user
read -p "Create and push tag $NEW_VERSION? [y/N] " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
fi

# Create annotated tag
git tag -a "$NEW_VERSION" -m "Release $NEW_VERSION"
echo "Created tag: $NEW_VERSION"

# Push tag to origin
git push origin "$NEW_VERSION"
echo "Pushed tag to origin"

echo ""
echo "Release $NEW_VERSION complete!"
