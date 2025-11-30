# Setup Guide

Quick setup instructions for the Media Compressor App.

## Quick Start

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **iOS Setup:**
   ```bash
   cd ios
   export LANG=en_US.UTF-8  # Fix encoding issue if needed
   pod install
   cd ..
   ```

3. **Run the app:**
   ```bash
   # Start Metro bundler
   yarn start
   
   # In another terminal, run iOS
   yarn ios
   
   # Or run Android
   yarn android
   ```

## Required Permissions

### iOS (Already Configured)
- Camera access
- Photo library access
- Photo library write access

### Android (Already Configured)
- Camera
- Read/Write external storage
- Read media images/videos (Android 13+)

## Troubleshooting

### Metro Bundler Issues
```bash
yarn start --reset-cache
```

### iOS Build Issues
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Android Build Issues
```bash
cd android
./gradlew clean
cd ..
```

### Module Not Found
```bash
rm -rf node_modules
yarn install
```

## Testing

1. Select an image or video from your device
2. Adjust the compression slider (1-10)
3. Tap "Compress"
4. View the results in the preview section

## Notes

- Video compression may take longer than image compression
- Large files may take more time to compress
- File sizes are displayed if `react-native-fs` is properly installed

