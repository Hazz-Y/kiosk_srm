import 'package:flutter/material.dart';

/// Nutrition Screen — Daily macros tab
class NutritionScreen extends StatelessWidget {
  const NutritionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('📊 Nutrition')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text("Today's Summary", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            Row(
              children: [
                _macroCard('🔥', '850', 'Calories', Colors.orange),
                const SizedBox(width: 12),
                _macroCard('💪', '35g', 'Protein', Colors.blue),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                _macroCard('🌾', '110g', 'Carbs', Colors.amber),
                const SizedBox(width: 12),
                _macroCard('🫒', '28g', 'Fat', Colors.red),
              ],
            ),
            const SizedBox(height: 24),
            const Text('Weekly Trend', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            Expanded(
              child: ListView(
                children: [
                  _dayRow('Mon', 850, 1500),
                  _dayRow('Tue', 1200, 1500),
                  _dayRow('Wed', 950, 1500),
                  _dayRow('Thu', 1100, 1500),
                  _dayRow('Fri', 780, 1500),
                  _dayRow('Sat', 1350, 1500),
                  _dayRow('Sun', 600, 1500),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _macroCard(String emoji, String value, String label, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          children: [
            Text(emoji, style: const TextStyle(fontSize: 24)),
            Text(value, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: color)),
            Text(label, style: TextStyle(fontSize: 12, color: Colors.grey[600])),
          ],
        ),
      ),
    );
  }

  Widget _dayRow(String day, int calories, int max) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          SizedBox(width: 40, child: Text(day, style: TextStyle(color: Colors.grey[600], fontSize: 13))),
          Expanded(
            child: LinearProgressIndicator(
              value: calories / max,
              backgroundColor: Colors.grey.shade200,
              valueColor: AlwaysStoppedAnimation(Colors.orange.shade400),
              minHeight: 20,
              borderRadius: BorderRadius.circular(10),
            ),
          ),
          const SizedBox(width: 8),
          SizedBox(width: 60, child: Text('$calories cal', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600), textAlign: TextAlign.right)),
        ],
      ),
    );
  }
}
