<div align="center">

# 🎬 React Native Compressor

### Compress Images & Videos Like a Pro

[![React Native](https://img.shields.io/badge/React%20Native-0.74.7-61DAFB?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.4-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-000000?style=for-the-badge)](https://reactnative.dev/)
[![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)]()

**A beautiful, modern React Native app for compressing images and videos with precision control**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Documentation](#-documentation)

---

</div>

## ✨ Features

<div align="center">

| Feature | Description |
|---------|-------------|
| 📷 **Media Support** | Upload images and videos from gallery or camera |
| 🎚️ **Smart Compression** | Adjustable compression levels (1-10) with real-time preview |
| 👀 **Live Preview** | Side-by-side comparison of original vs compressed media |
| 📊 **File Analytics** | See file sizes, compression ratios, and savings |
| 🎨 **Modern UI** | Beautiful, minimalistic design with smooth animations |
| 📱 **Cross-Platform** | Native performance on both iOS and Android |
| ⚡ **Fast Processing** | Optimized compression algorithms for quick results |
| 🔒 **Privacy First** | All processing happens locally on your device |

</div>

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

- **Node.js** >= 18
- **Yarn** (recommended) or npm
- **iOS**: Xcode 14+ and CocoaPods
- **Android**: Android Studio and JDK 17+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ReactNativeComporessor

# Install dependencies
yarn install

# iOS: Install CocoaPods
cd ios
export LANG=en_US.UTF-8  # Fix encoding if needed
pod install
cd ..

# Start Metro bundler
yarn start

# Run on iOS (in a new terminal)
yarn ios

# Or run on Android
yarn android
```

---

## 📖 Usage Guide

### Basic Workflow

1. **📸 Select Media**
   - Tap the "Select Media" button
   - Choose from gallery or capture with camera
   - Supports both images and videos

2. **🎚️ Adjust Compression**
   - Use the slider to set compression level (1-10)
   - **Lower (1-3)**: Larger file, Higher quality
   - **Medium (4-6)**: Balanced size and quality
   - **Higher (7-10)**: Smaller file, Lower quality

3. **⚡ Compress**
   - Tap the "Compress" button
   - Watch real-time progress
   - Get instant results

4. **👀 Preview & Compare**
   - View original and compressed media side-by-side
   - Check file sizes and compression statistics
   - See exactly how much space you saved

### Compression Levels Explained

```
Level 1  → 100% Quality → Low Compression  → Larger File
Level 5  →  60% Quality → Medium Compression → Balanced
Level 10 →  10% Quality → High Compression → Smaller File
```

**Formula**: `Quality = 110 - (Level × 10)`

---

## 🏗️ Project Structure

```
ReactNativeComporessor/
│
├── 📱 App.tsx                    # Main application component
├── 📄 app.json                   # App configuration
├── 📦 package.json               # Dependencies
│
├── 📂 src/
│   ├── 📂 components/           # React components
│   │   ├── MediaPicker.tsx       # 📷 Media selection
│   │   ├── CompressionSlider.tsx # 🎚️ Compression control
│   │   ├── CompressButton.tsx    # ⚡ Compress action
│   │   └── MediaPreview.tsx       # 👀 Preview section
│   │
│   ├── 📂 utils/                 # Utility functions
│   │   ├── compressionUtils.ts   # 🗜️ Compression logic
│   │   └── fileUtils.ts          # 📁 File operations
│   │
│   ├── 📂 types/                 # TypeScript definitions
│   │   └── index.ts              # Type exports
│   │
│   └── 📂 styles/                # Theme & styling
│       └── theme.ts              # 🎨 Design system
│
├── 📂 ios/                       # iOS native code
└── 📂 android/                   # Android native code
```

---

## 📚 Documentation

### Image Compression

- **Formats**: JPEG, PNG, WebP, HEIC
- **Method**: Auto (optimized per format)
- **Max Dimensions**: 1920×1920px (aspect ratio preserved)
- **Quality Range**: 10-100% (based on compression level)

### Video Compression

- **Formats**: MP4, MOV, and other common formats
- **Method**: Auto (optimized bitrate)
- **Bitrate**: Dynamically calculated based on compression level
- **Processing**: May take longer for large files

### Technical Stack

| Library | Version | Purpose |
|---------|---------|---------|
| `react-native-image-picker` | ^7.1.2 | Media selection |
| `react-native-compressor` | ^1.13.0 | Image/video compression |
| `@react-native-community/slider` | ^4.5.2 | Compression slider |
| `react-native-video` | ^6.0.0 | Video preview |
| `react-native-fs` | ^2.20.0 | File system operations |

---

## 🔧 Configuration

### iOS Permissions

Configured in `ios/AwesomeProject/Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>We need access to your camera to capture photos and videos for compression.</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photo library to select images and videos for compression.</string>
```

### Android Permissions

Configured in `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
```

---

## 🐛 Troubleshooting

### Common Issues

<details>
<summary><b>🚨 Metro Bundler Errors</b></summary>

```bash
# Clear Metro cache
yarn start --reset-cache

# Or clear watchman cache
watchman watch-del-all
rm -rf $TMPDIR/metro-* $TMPDIR/haste-*
```

</details>

<details>
<summary><b>🍎 iOS Build Issues</b></summary>

```bash
# Clean and reinstall pods
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..

# Clean Xcode build
# Product → Clean Build Folder (Shift+Cmd+K)
```

</details>

<details>
<summary><b>🤖 Android Build Issues</b></summary>

```bash
# Clean Gradle build
cd android
./gradlew clean
cd ..

# Clear Android Studio cache
# File → Invalidate Caches / Restart
```

</details>

<details>
<summary><b>📦 Module Not Found</b></summary>

```bash
# Reinstall dependencies
rm -rf node_modules yarn.lock
yarn install

# For iOS, reinstall pods
cd ios && pod install && cd ..
```

</details>

---

## 🎯 Development

### Key Implementation Details

- **Media Selection**: Uses `react-native-image-picker` with `mediaType: 'mixed'`
- **Compression Logic**: Converts slider (1-10) to quality percentage (10-100%)
- **File Size**: Uses `react-native-fs` for accurate file size calculation
- **Layout**: 50/50 split layout using flexbox for responsive design
- **State Management**: React hooks for local state management

### Extending the App

Want to add more features? Here are some ideas:

- 💾 **Save to Gallery**: Add functionality to save compressed media
- 📤 **Batch Processing**: Compress multiple files at once
- ☁️ **Cloud Storage**: Integrate with cloud storage APIs
- 🎨 **Custom Formats**: Add support for more media formats
- 📈 **Analytics**: Track compression statistics over time
- 🔄 **Undo/Redo**: Add history for compression operations

---

## 📱 Screenshots

> _Add screenshots of your app here!_

---

## 🤝 Contributing

This is a private project, but suggestions and feedback are welcome!

---

## 📄 License

This project is private and proprietary.

---

## 🙏 Acknowledgments

- Built with [React Native](https://reactnative.dev/)
- Compression powered by [react-native-compressor](https://github.com/numandev1/react-native-compressor)
- Icons and emojis from various sources

---

<div align="center">

**Made with ❤️ using React Native**

[⬆ Back to Top](#-react-native-compressor)

</div>
