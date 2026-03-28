import 'package:flutter/material.dart';
import '../models/models.dart';

/// Item Detail Screen
class ItemDetailScreen extends StatelessWidget {
  const ItemDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final item = ModalRoute.of(context)?.settings.arguments as MenuItem?;
    if (item == null) return const Scaffold(body: Center(child: Text('Item not found')));

    return Scaffold(
      appBar: AppBar(title: Text(item.name)),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: 200,
              width: double.infinity,
              decoration: BoxDecoration(
                gradient: LinearGradient(colors: [Colors.orange.shade100, Colors.orange.shade300]),
              ),
              child: const Center(child: Text('🍽️', style: TextStyle(fontSize: 80))),
            ),
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(item.name, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
                  if (item.description != null) ...[const SizedBox(height: 8), Text(item.description!, style: TextStyle(color: Colors.grey[600]))],
                  const SizedBox(height: 20),
                  // Nutrition grid
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(color: Colors.grey.shade50, borderRadius: BorderRadius.circular(16)),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _macroWidget('🔥', '${item.calories}', 'cal', Colors.orange),
                        _macroWidget('💪', '${item.proteinG}g', 'Protein', Colors.blue),
                        _macroWidget('🌾', '${item.carbsG}g', 'Carbs', Colors.amber),
                        _macroWidget('🫒', '${item.fatG}g', 'Fat', Colors.red),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('₹${item.price.toStringAsFixed(0)}', style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold)),
                      ElevatedButton(
                        onPressed: () {
                          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('${item.name} added!')));
                        },
                        child: const Text('Add to Cart'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _macroWidget(String emoji, String value, String label, Color color) {
    return Column(children: [
      Text(emoji, style: const TextStyle(fontSize: 20)),
      Text(value, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: color)),
      Text(label, style: TextStyle(fontSize: 11, color: Colors.grey[500])),
    ]);
  }
}
