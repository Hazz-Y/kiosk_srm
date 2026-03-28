/// Menu Item data model
class MenuItem {
  final String id;
  final String vendorId;
  final String name;
  final String? description;
  final double price;
  final bool isVeg;
  final int calories;
  final double proteinG;
  final double carbsG;
  final double fatG;
  final bool isAvailable;

  MenuItem({
    required this.id,
    required this.vendorId,
    required this.name,
    this.description,
    required this.price,
    required this.isVeg,
    required this.calories,
    required this.proteinG,
    required this.carbsG,
    required this.fatG,
    required this.isAvailable,
  });

  factory MenuItem.fromJson(Map<String, dynamic> json) {
    return MenuItem(
      id: json['id'] as String,
      vendorId: json['vendorId'] as String,
      name: json['name'] as String,
      description: json['description'] as String?,
      price: (json['price'] as num).toDouble(),
      isVeg: json['isVeg'] as bool? ?? true,
      calories: json['calories'] as int? ?? 0,
      proteinG: (json['proteinG'] as num?)?.toDouble() ?? 0,
      carbsG: (json['carbsG'] as num?)?.toDouble() ?? 0,
      fatG: (json['fatG'] as num?)?.toDouble() ?? 0,
      isAvailable: json['isAvailable'] as bool? ?? true,
    );
  }
}

/// Vendor data model
class Vendor {
  final String id;
  final String name;
  final String outletCode;
  final String? location;
  final String status;

  Vendor({
    required this.id,
    required this.name,
    required this.outletCode,
    this.location,
    required this.status,
  });

  factory Vendor.fromJson(Map<String, dynamic> json) {
    return Vendor(
      id: json['id'] as String,
      name: json['name'] as String,
      outletCode: json['outletCode'] as String,
      location: json['location'] as String?,
      status: json['status'] as String,
    );
  }
}

/// Cart Item
class CartItem {
  final MenuItem menuItem;
  final String vendorName;
  int quantity;

  CartItem({
    required this.menuItem,
    required this.vendorName,
    this.quantity = 1,
  });
}
