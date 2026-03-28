import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/models.dart';

/// API Service — HTTP client for VEats backend
class ApiService {
  // TODO: Replace with your backend URL
  static const String baseUrl = 'http://10.0.2.2:3001/api'; // Android emulator localhost

  /// Fetch all active vendors
  static Future<List<Vendor>> getVendors() async {
    final response = await http.get(Uri.parse('$baseUrl/vendors'));
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((v) => Vendor.fromJson(v)).toList();
    }
    throw Exception('Failed to load vendors');
  }

  /// Fetch vendor menu items
  static Future<List<MenuItem>> getVendorMenu(String vendorId) async {
    final response = await http.get(Uri.parse('$baseUrl/vendors/$vendorId/menu'));
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((m) => MenuItem.fromJson(m)).toList();
    }
    throw Exception('Failed to load menu');
  }

  /// Create order
  static Future<Map<String, dynamic>> createOrder({
    required String userId,
    required List<Map<String, dynamic>> items,
    String? promoCode,
    double promoDiscount = 0,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/orders/create'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'userId': userId,
        'items': items,
        'promoCode': promoCode,
        'promoDiscount': promoDiscount,
      }),
    );
    if (response.statusCode == 201 || response.statusCode == 200) {
      return json.decode(response.body);
    }
    throw Exception('Failed to create order');
  }

  /// Get nutrition summary
  static Future<Map<String, dynamic>> getNutrition(String userId, String date) async {
    final response = await http.get(Uri.parse('$baseUrl/nutrition/user/$userId?date=$date'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    }
    throw Exception('Failed to load nutrition');
  }
}
