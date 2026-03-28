// VEats — Database Seed (Real VIT Chennai Campus Cafes)
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding VEats database with VIT Chennai cafes...');

    // ── Clean up ──
    await prisma.orderItem.deleteMany();
    await prisma.foodLog.deleteMany();
    await prisma.order.deleteMany();
    await prisma.settlement.deleteMany();
    await prisma.menuItem.deleteMany();
    await prisma.vendor.deleteMany();
    await prisma.user.deleteMany();

    // ── Users ──
    const users = await Promise.all([
        prisma.user.create({ data: { fullName: 'Harsh Student', email: 'harsh@veats.in', phone: '9876543210', password: '$2b$10$DUMMY_HASH', role: 'CUSTOMER' } }),
        prisma.user.create({ data: { fullName: 'VEats Admin', email: 'admin@veats.in', phone: '9876543211', password: '$2b$10$DUMMY_HASH', role: 'ADMIN' } }),
        prisma.user.create({ data: { fullName: 'Gazebo Vendor', email: 'gazebo@veats.in', phone: '9876543212', password: '$2b$10$DUMMY_HASH', role: 'VENDOR' } }),
    ]);
    console.log('  ✓ Users:', users.map(u => u.fullName).join(', '));

    // ── Vendors (Real VIT Chennai campus cafes) ──
    const vendorsData = [
        { name: 'Gazebo', outletCode: 'GZBO-001', location: 'Near Main Gate', commissionPercent: 10, status: 'ACTIVE' as const },
        { name: 'North Square', outletCode: 'NSQR-001', location: 'Central Campus', commissionPercent: 8, status: 'ACTIVE' as const },
        { name: 'AB1 Cafe', outletCode: 'AB1C-001', location: 'Academic Block 1', commissionPercent: 12, status: 'ACTIVE' as const },
        { name: 'AB2 Cafe', outletCode: 'AB2C-001', location: 'Academic Block 2', commissionPercent: 10, status: 'ACTIVE' as const },
        { name: 'AB3 Cafe 1', outletCode: 'AB3A-001', location: 'Academic Block 3, Wing A', commissionPercent: 8, status: 'ACTIVE' as const },
        { name: 'AB3 Cafe 2', outletCode: 'AB3B-001', location: 'Academic Block 3, Wing B', commissionPercent: 10, status: 'ACTIVE' as const },
        { name: 'V Mart', outletCode: 'VMRT-001', location: 'North Square Area', commissionPercent: 15, status: 'ACTIVE' as const },
    ];

    const vMap: Record<string, string> = {};
    for (const v of vendorsData) {
        const vendor = await prisma.vendor.create({ data: v });
        vMap[v.name] = vendor.id;
    }
    console.log('  ✓ Vendors:', Object.keys(vMap).join(', '));

    // ── Menu Items ──
    const items = [
        // Gazebo
        { vendorId: vMap['Gazebo'], name: 'Classic Chicken Burger', description: 'Crispy fried chicken patty with lettuce, tomato, mayo', price: 120, isVeg: false, calories: 480, proteinG: 28, carbsG: 45, fatG: 22, isAvailable: true },
        { vendorId: vMap['Gazebo'], name: 'Chicken Shawarma', description: 'Juicy chicken strips with garlic sauce in pita bread', price: 100, isVeg: false, calories: 420, proteinG: 26, carbsG: 38, fatG: 18, isAvailable: true },
        { vendorId: vMap['Gazebo'], name: 'Paneer Wrap', description: 'Grilled paneer with mint chutney and veggies in tortilla', price: 90, isVeg: true, calories: 380, proteinG: 18, carbsG: 42, fatG: 16, isAvailable: true },
        { vendorId: vMap['Gazebo'], name: 'Chicken Nuggets (6pc)', description: 'Golden crispy chicken nuggets with dipping sauce', price: 110, isVeg: false, calories: 350, proteinG: 22, carbsG: 28, fatG: 20, isAvailable: true },
        { vendorId: vMap['Gazebo'], name: 'White Sauce Pasta', description: 'Creamy alfredo penne with herbs and parmesan', price: 130, isVeg: true, calories: 520, proteinG: 16, carbsG: 62, fatG: 24, isAvailable: true },
        { vendorId: vMap['Gazebo'], name: 'Chocolate Brownie', description: 'Rich fudgy chocolate brownie with walnuts', price: 60, isVeg: true, calories: 310, proteinG: 4, carbsG: 42, fatG: 18, isAvailable: true },

        // North Square
        { vendorId: vMap['North Square'], name: 'Chili Garlic Shawarma', description: 'Spicy chili garlic chicken in fresh pita — campus bestseller', price: 110, isVeg: false, calories: 450, proteinG: 28, carbsG: 40, fatG: 20, isAvailable: true },
        { vendorId: vMap['North Square'], name: 'Red Sauce Pasta', description: 'Tangy tomato basil pasta with Italian herbs', price: 100, isVeg: true, calories: 440, proteinG: 14, carbsG: 58, fatG: 18, isAvailable: true },
        { vendorId: vMap['North Square'], name: 'Cheese Maggi', description: 'Classic Maggi loaded with melted cheese and butter', price: 60, isVeg: true, calories: 380, proteinG: 10, carbsG: 52, fatG: 16, isAvailable: true },
        { vendorId: vMap['North Square'], name: 'Veg Sandwich', description: 'Grilled sandwich with veggies, cheese, and chutney', price: 50, isVeg: true, calories: 280, proteinG: 12, carbsG: 35, fatG: 12, isAvailable: true },
        { vendorId: vMap['North Square'], name: 'Bread Omelette', description: 'Fluffy egg omelette with spices and buttered toast', price: 40, isVeg: false, calories: 320, proteinG: 18, carbsG: 28, fatG: 16, isAvailable: true },

        // AB1 Cafe
        { vendorId: vMap['AB1 Cafe'], name: 'Veg Samosa (2pc)', description: 'Crispy golden samosas with spicy potato filling', price: 20, isVeg: true, calories: 260, proteinG: 6, carbsG: 32, fatG: 14, isAvailable: true },
        { vendorId: vMap['AB1 Cafe'], name: 'Masala Chai', description: 'Hot spiced tea with ginger, cardamom, and fresh milk', price: 15, isVeg: true, calories: 90, proteinG: 3, carbsG: 14, fatG: 3, isAvailable: true },
        { vendorId: vMap['AB1 Cafe'], name: 'Filter Coffee', description: 'Traditional South Indian filter coffee', price: 20, isVeg: true, calories: 80, proteinG: 2, carbsG: 12, fatG: 3, isAvailable: true },
        { vendorId: vMap['AB1 Cafe'], name: 'Veg Patties', description: 'Crispy puff pastry filled with spiced vegetables', price: 25, isVeg: true, calories: 220, proteinG: 5, carbsG: 28, fatG: 12, isAvailable: true },
        { vendorId: vMap['AB1 Cafe'], name: 'Bread Sandwich', description: 'Toasted sandwich with cheese, tomato, and cucumber', price: 30, isVeg: true, calories: 240, proteinG: 10, carbsG: 30, fatG: 10, isAvailable: true },

        // AB2 Cafe
        { vendorId: vMap['AB2 Cafe'], name: 'Masala Dosa', description: 'Crispy golden dosa with potato filling, chutney & sambar', price: 50, isVeg: true, calories: 350, proteinG: 10, carbsG: 52, fatG: 12, isAvailable: true },
        { vendorId: vMap['AB2 Cafe'], name: 'Hakka Noodles', description: 'Stir-fried noodles with vegetables and soy sauce', price: 70, isVeg: true, calories: 420, proteinG: 12, carbsG: 58, fatG: 16, isAvailable: true },
        { vendorId: vMap['AB2 Cafe'], name: 'Egg Fried Rice', description: 'Wok-tossed rice with scrambled egg and spring onions', price: 80, isVeg: false, calories: 480, proteinG: 18, carbsG: 62, fatG: 18, isAvailable: true },
        { vendorId: vMap['AB2 Cafe'], name: 'Vada Pav', description: 'Mumbai-style spiced potato fritter in a bun', price: 25, isVeg: true, calories: 300, proteinG: 8, carbsG: 42, fatG: 14, isAvailable: true },
        { vendorId: vMap['AB2 Cafe'], name: 'Plain Dosa', description: 'Thin crispy dosa with coconut chutney and sambar', price: 35, isVeg: true, calories: 250, proteinG: 6, carbsG: 42, fatG: 8, isAvailable: true },

        // AB3 Cafe 1
        { vendorId: vMap['AB3 Cafe 1'], name: 'AB3 Special Biryani', description: 'Legendary AB3 chicken biryani — campus favourite', price: 120, isVeg: false, calories: 650, proteinG: 32, carbsG: 72, fatG: 22, isAvailable: true },
        { vendorId: vMap['AB3 Cafe 1'], name: 'AB3 Noodles', description: 'Spicy Indo-Chinese noodles — another campus icon', price: 80, isVeg: true, calories: 440, proteinG: 12, carbsG: 60, fatG: 18, isAvailable: true },
        { vendorId: vMap['AB3 Cafe 1'], name: 'Chicken Roll', description: 'Spiced chicken strips in a flaky paratha', price: 80, isVeg: false, calories: 400, proteinG: 24, carbsG: 40, fatG: 18, isAvailable: true },
        { vendorId: vMap['AB3 Cafe 1'], name: 'Veg Biryani', description: 'Fragrant basmati rice with mixed vegetables', price: 90, isVeg: true, calories: 520, proteinG: 14, carbsG: 68, fatG: 18, isAvailable: true },
        { vendorId: vMap['AB3 Cafe 1'], name: 'Paneer Roll', description: 'Grilled paneer with onions in paratha', price: 70, isVeg: true, calories: 380, proteinG: 16, carbsG: 38, fatG: 18, isAvailable: true },
        { vendorId: vMap['AB3 Cafe 1'], name: 'French Fries', description: 'Golden crispy fries with peri-peri seasoning', price: 50, isVeg: true, calories: 320, proteinG: 4, carbsG: 44, fatG: 16, isAvailable: true },

        // AB3 Cafe 2
        { vendorId: vMap['AB3 Cafe 2'], name: 'Grilled Veg Sandwich', description: 'Multi-layer grilled cheese sandwich', price: 60, isVeg: true, calories: 320, proteinG: 14, carbsG: 38, fatG: 14, isAvailable: true },
        { vendorId: vMap['AB3 Cafe 2'], name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice — no sugar added', price: 40, isVeg: true, calories: 110, proteinG: 2, carbsG: 26, fatG: 0, isAvailable: true },
        { vendorId: vMap['AB3 Cafe 2'], name: 'Butter Maggi', description: 'Classic Maggi with butter and pepper', price: 40, isVeg: true, calories: 340, proteinG: 8, carbsG: 48, fatG: 14, isAvailable: true },
        { vendorId: vMap['AB3 Cafe 2'], name: 'Cold Coffee', description: 'Thick creamy cold coffee with ice cream', price: 50, isVeg: true, calories: 220, proteinG: 6, carbsG: 32, fatG: 8, isAvailable: true },
        { vendorId: vMap['AB3 Cafe 2'], name: 'Aloo Paratha', description: 'Stuffed potato paratha with curd and pickle', price: 45, isVeg: true, calories: 380, proteinG: 10, carbsG: 50, fatG: 16, isAvailable: true },

        // V Mart
        { vendorId: vMap['V Mart'], name: 'Lay\'s Classic Chips', description: 'Crunchy salted potato chips — study snack', price: 20, isVeg: true, calories: 160, proteinG: 2, carbsG: 15, fatG: 10, isAvailable: true },
        { vendorId: vMap['V Mart'], name: 'Oreo Milkshake', description: 'Thick Oreo milkshake with cookie crumble', price: 60, isVeg: true, calories: 340, proteinG: 8, carbsG: 52, fatG: 14, isAvailable: true },
        { vendorId: vMap['V Mart'], name: 'Vanilla Ice Cream Cup', description: 'Creamy vanilla ice cream in a cup', price: 30, isVeg: true, calories: 200, proteinG: 4, carbsG: 24, fatG: 10, isAvailable: true },
        { vendorId: vMap['V Mart'], name: 'Fresh Lime Soda', description: 'Sweet and salty lemon soda', price: 25, isVeg: true, calories: 80, proteinG: 0, carbsG: 20, fatG: 0, isAvailable: true },
        { vendorId: vMap['V Mart'], name: 'Cup Noodles', description: 'Instant cup noodles — quick fix between classes', price: 40, isVeg: true, calories: 290, proteinG: 6, carbsG: 40, fatG: 12, isAvailable: true },
    ];

    for (const item of items) {
        await prisma.menuItem.create({ data: item });
    }
    console.log(`  ✓ Menu items: ${items.length} items created`);

    console.log('\\n✅ Seed complete!');
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
