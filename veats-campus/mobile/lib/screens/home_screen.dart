import 'package:flutter/material.dart';

/// Home Screen — Vendor list
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  // Mock vendors for scaffold
  static final vendors = [
    {'id': 'v1', 'name': 'Café Central', 'location': 'Main Building, Ground Floor', 'items': 3},
    {'id': 'v2', 'name': 'Mess A', 'location': 'Hostel Block A', 'items': 3},
    {'id': 'v3', 'name': 'Tech Mart', 'location': 'Engineering Block Canteen', 'items': 3},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Row(children: [Text('🍽️ '), Text('VEats', style: TextStyle(fontWeight: FontWeight.bold))]),
        actions: [
          IconButton(icon: const Icon(Icons.restaurant_menu), onPressed: () => Navigator.pushNamed(context, '/nutrition')),
          IconButton(icon: const Icon(Icons.shopping_cart), onPressed: () => Navigator.pushNamed(context, '/cart')),
        ],
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: vendors.length,
        itemBuilder: (context, index) {
          final v = vendors[index];
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: InkWell(
              onTap: () => Navigator.pushNamed(context, '/vendor-menu', arguments: v),
              borderRadius: BorderRadius.circular(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    height: 100,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(colors: [Colors.orange.shade100, Colors.orange.shade200]),
                      borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
                    ),
                    child: const Center(child: Text('🏪', style: TextStyle(fontSize: 40))),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(v['name'] as String, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                        const SizedBox(height: 4),
                        Text('📍 ${v['location']}', style: TextStyle(color: Colors.grey[600], fontSize: 13)),
                        const SizedBox(height: 8),
                        Text('${v['items']} items available', style: TextStyle(color: Colors.grey[400], fontSize: 12)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
