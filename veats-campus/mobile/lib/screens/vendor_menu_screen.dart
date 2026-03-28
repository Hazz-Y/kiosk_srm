import 'package:flutter/material.dart';
import '../widgets/item_card.dart';
import '../models/models.dart';

/// Vendor Menu Screen — Shows menu items for a vendor
class VendorMenuScreen extends StatelessWidget {
  const VendorMenuScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Mock menu items
    final mockItems = [
      MenuItem(id: '1', vendorId: 'v1', name: 'Masala Chai', description: 'Spiced Indian tea', price: 30, isVeg: true, calories: 120, proteinG: 3, carbsG: 18, fatG: 4, isAvailable: true),
      MenuItem(id: '2', vendorId: 'v1', name: 'Paneer Sandwich', description: 'Grilled paneer with mint chutney', price: 80, isVeg: true, calories: 320, proteinG: 14, carbsG: 35, fatG: 14, isAvailable: true),
      MenuItem(id: '3', vendorId: 'v1', name: 'Cold Coffee', description: 'Iced coffee with cream', price: 60, isVeg: true, calories: 180, proteinG: 5, carbsG: 28, fatG: 6, isAvailable: true),
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Menu')),
      body: GridView.builder(
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          childAspectRatio: 0.65,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
        ),
        itemCount: mockItems.length,
        itemBuilder: (context, index) {
          return ItemCard(
            item: mockItems[index],
            vendorName: 'Café Central',
            onAdd: () => ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('${mockItems[index].name} added to cart!')),
            ),
            onTap: () => Navigator.pushNamed(context, '/item-detail', arguments: mockItems[index]),
          );
        },
      ),
    );
  }
}
