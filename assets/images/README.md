# Tokyo Toilet - Assets Directory

This directory contains the app icons and assets for the Tokyo Toilet Expo app.

## Required Files for Expo:

### App Icon (icon.png)
- **Required**: 1024x1024px PNG file
- **Purpose**: Main app icon for iOS and Android
- **Current**: icon.svg (needs conversion to PNG)
- **Background**: Should have a solid background color
- **Format**: PNG with no transparency for app store

### Favicon (favicon.png)  
- **Required**: 48x48px PNG file
- **Purpose**: Web favicon
- **Current**: favicon.svg (needs conversion to PNG)

## How to Convert SVG to PNG:

### Option 1: Online Converter
1. Go to https://svgtopng.com/ or similar
2. Upload the icon.svg file
3. Set size to 1024x1024px
4. Download as icon.png

### Option 2: Using ImageMagick (if installed)
```bash
# Install ImageMagick first if not already installed
# macOS: brew install imagemagick

# Convert icon
magick icon.svg -resize 1024x1024 icon.png

# Convert favicon  
magick favicon.svg -resize 48x48 favicon.png
```

### Option 3: Using Inkscape (if installed)
```bash
# Convert icon
inkscape icon.svg --export-type=png --export-filename=icon.png --export-width=1024 --export-height=1024

# Convert favicon
inkscape favicon.svg --export-type=png --export-filename=favicon.png --export-width=48 --export-height=48
```

## Design Guidelines:

### iOS App Icon
- 1024x1024px
- No transparency
- Rounded corners will be applied automatically
- Should look good when scaled down

### Android App Icon  
- 1024x1024px
- Can have transparency
- Should include padding for different launchers

### Web Favicon
- 48x48px recommended
- Should be recognizable at small sizes

## Current Design:
- Green background (#009944)
- White "TT" text (Tokyo Toilet)
- Clean, minimalist design
- Matches the app's brand colors