# VEats Mobile — Flutter App

## Setup

1. Install [Flutter SDK](https://docs.flutter.dev/get-started/install).
2. Run `flutter doctor` to verify installation.
3. Clone this repo and navigate to `mobile/`.

## Running (Android Debug)

```bash
# Get dependencies
flutter pub get

# Run on connected device / emulator
flutter run

# Build debug APK
flutter build apk --debug
```

## Project Structure

```
lib/
  main.dart            # App entry + routes
  models/
    models.dart        # Data models (MenuItem, Vendor, CartItem)
  services/
    api_service.dart   # HTTP client for backend
  screens/
    auth_screen.dart
    home_screen.dart
    vendor_menu_screen.dart
    item_detail_screen.dart
    cart_screen.dart
    checkout_screen.dart
    order_confirmation_screen.dart
    nutrition_screen.dart
  widgets/
    item_card.dart     # Reusable item card
test/
  item_card_test.dart  # Widget test
```

## Backend Connection

Update `ApiService.baseUrl` in `lib/services/api_service.dart`:
- Android Emulator: `http://10.0.2.2:3001/api`
- Physical Device: `http://<your-ip>:3001/api`

## Testing

```bash
flutter test
```
