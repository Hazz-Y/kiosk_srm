import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:veats_mobile/widgets/item_card.dart';
import 'package:veats_mobile/models/models.dart';

void main() {
  testWidgets('ItemCard shows calories badge', (WidgetTester tester) async {
    final item = MenuItem(
      id: 'test-1',
      vendorId: 'v1',
      name: 'Paneer Sandwich',
      description: 'Grilled paneer',
      price: 80,
      isVeg: true,
      calories: 320,
      proteinG: 14,
      carbsG: 35,
      fatG: 14,
      isAvailable: true,
    );

    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: SingleChildScrollView(
            child: ItemCard(
              item: item,
              vendorName: 'Café Central',
              onAdd: () {},
            ),
          ),
        ),
      ),
    );

    // Verify item name is displayed
    expect(find.text('Paneer Sandwich'), findsOneWidget);

    // Verify calories badge is shown
    expect(find.byKey(const Key('calories-badge')), findsOneWidget);
    expect(find.textContaining('320 cal'), findsOneWidget);

    // Verify price is shown
    expect(find.text('₹80'), findsOneWidget);

    // Verify ADD button exists
    expect(find.text('ADD +'), findsOneWidget);
  });

  testWidgets('ItemCard shows non-veg indicator for non-veg items', (WidgetTester tester) async {
    final item = MenuItem(
      id: 'test-2',
      vendorId: 'v1',
      name: 'Chicken Biryani',
      price: 120,
      isVeg: false,
      calories: 650,
      proteinG: 32,
      carbsG: 70,
      fatG: 22,
      isAvailable: true,
    );

    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: SingleChildScrollView(
            child: ItemCard(
              item: item,
              vendorName: 'Mess A',
            ),
          ),
        ),
      ),
    );

    expect(find.text('Chicken Biryani'), findsOneWidget);
    expect(find.textContaining('650 cal'), findsOneWidget);
  });
}
