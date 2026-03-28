// ─── VIT Chennai Cafes — Real Data ───
// Unsplash stock food images for each vendor and menu item

export const FOOD_IMAGES: Record<string, string> = {
    // Vendor cover images
    'gazebo': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
    'north-square': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
    'ab1-cafe': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
    'ab2-cafe': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
    'ab3-cafe-1': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
    'ab3-cafe-2': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop',
    'vmart': 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop',

    // Food item images
    'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    'shawarma': 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop',
    'wrap': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    'nuggets': 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop',
    'pasta': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
    'red-pasta': 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop',
    'brownie': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
    'noodles': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    'maggi': 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop',
    'sandwich': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop',
    'biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    'coffee': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
    'cold-coffee': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    'tea': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
    'samosa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    'dosa': 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop',
    'fried-rice': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    'vada-pav': 'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=400&h=300&fit=crop',
    'rolls': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    'juice': 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=400&h=300&fit=crop',
    'ice-cream': 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=300&fit=crop',
    'chips': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=300&fit=crop',
    'fries': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
    'patties': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    'milkshake': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop',
    'paratha': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
};

export interface Vendor {
    id: string;
    name: string;
    outletCode: string;
    location: string;
    image: string;
    rating: number;
    ratingCount: string;
    cuisine: string;
    avgPrice: number;
    deliveryTime: string;
    isOpen: boolean;
    offers?: string;
}

export interface MenuItem {
    id: string;
    vendorId: string;
    vendorName: string;
    name: string;
    description: string;
    image: string;
    price: number;
    isVeg: boolean;
    calories: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
    category: string;
    isAvailable: boolean;
    isBestseller?: boolean;
}

export const categories = [
    { id: 'all', emoji: '🍽️', label: 'All' },
    { id: 'biryani', emoji: '🍛', label: 'Biryani' },
    { id: 'chinese', emoji: '🥡', label: 'Chinese' },
    { id: 'snacks', emoji: '🍟', label: 'Snacks' },
    { id: 'beverages', emoji: '☕', label: 'Beverages' },
    { id: 'south-indian', emoji: '🥘', label: 'South Indian' },
    { id: 'burgers', emoji: '🍔', label: 'Burgers' },
    { id: 'desserts', emoji: '🍰', label: 'Desserts' },
    { id: 'wraps', emoji: '🌯', label: 'Wraps' },
];

export const vendors: Vendor[] = [
    {
        id: 'gazebo',
        name: 'Gazebo',
        outletCode: 'GZBO-001',
        location: 'Near Main Gate',
        image: FOOD_IMAGES['gazebo'],
        rating: 4.2,
        ratingCount: '1.2K+',
        cuisine: 'Fast Food • Burgers • Wraps',
        avgPrice: 120,
        deliveryTime: '15-20 mins',
        isOpen: true,
        offers: '20% OFF up to ₹50',
    },
    {
        id: 'north-square',
        name: 'North Square',
        outletCode: 'NSQR-001',
        location: 'Central Campus',
        image: FOOD_IMAGES['north-square'],
        rating: 4.0,
        ratingCount: '900+',
        cuisine: 'Shawarma • Pasta • Maggi',
        avgPrice: 100,
        deliveryTime: '10-15 mins',
        isOpen: true,
        offers: 'Buy 1 Get 1 on Maggi',
    },
    {
        id: 'ab1-cafe',
        name: 'AB1 Cafe',
        outletCode: 'AB1C-001',
        location: 'Academic Block 1',
        image: FOOD_IMAGES['ab1-cafe'],
        rating: 3.8,
        ratingCount: '650+',
        cuisine: 'Snacks • Tea • Coffee',
        avgPrice: 50,
        deliveryTime: '5-10 mins',
        isOpen: true,
    },
    {
        id: 'ab2-cafe',
        name: 'AB2 Cafe',
        outletCode: 'AB2C-001',
        location: 'Academic Block 2',
        image: FOOD_IMAGES['ab2-cafe'],
        rating: 3.9,
        ratingCount: '500+',
        cuisine: 'South Indian • Chinese',
        avgPrice: 70,
        deliveryTime: '10-15 mins',
        isOpen: true,
    },
    {
        id: 'ab3-cafe-1',
        name: 'AB3 Cafe 1',
        outletCode: 'AB3A-001',
        location: 'Academic Block 3, Wing A',
        image: FOOD_IMAGES['ab3-cafe-1'],
        rating: 4.1,
        ratingCount: '800+',
        cuisine: 'Biryani • Noodles • Rolls',
        avgPrice: 90,
        deliveryTime: '10-20 mins',
        isOpen: true,
        offers: '₹30 OFF on Biryani',
    },
    {
        id: 'ab3-cafe-2',
        name: 'AB3 Cafe 2',
        outletCode: 'AB3B-001',
        location: 'Academic Block 3, Wing B',
        image: FOOD_IMAGES['ab3-cafe-2'],
        rating: 3.7,
        ratingCount: '400+',
        cuisine: 'Sandwiches • Juice • Maggi',
        avgPrice: 60,
        deliveryTime: '5-10 mins',
        isOpen: true,
    },
    {
        id: 'vmart',
        name: 'V Mart',
        outletCode: 'VMRT-001',
        location: 'North Square Area',
        image: FOOD_IMAGES['vmart'],
        rating: 3.5,
        ratingCount: '300+',
        cuisine: 'Snacks • Beverages • Ice Cream',
        avgPrice: 40,
        deliveryTime: '5 mins',
        isOpen: true,
    },
];

export const menuItems: MenuItem[] = [
    // ─── Gazebo ───
    { id: 'gz-01', vendorId: 'gazebo', vendorName: 'Gazebo', name: 'Classic Chicken Burger', description: 'Crispy fried chicken patty with lettuce, tomato, mayo and toasted bun', image: FOOD_IMAGES['burger'], price: 120, isVeg: false, calories: 480, proteinG: 28, carbsG: 45, fatG: 22, category: 'burgers', isAvailable: true, isBestseller: true },
    { id: 'gz-02', vendorId: 'gazebo', vendorName: 'Gazebo', name: 'Chicken Shawarma', description: 'Juicy chicken strips with garlic sauce, pickles, wrapped in fresh pita bread', image: FOOD_IMAGES['shawarma'], price: 100, isVeg: false, calories: 420, proteinG: 26, carbsG: 38, fatG: 18, category: 'wraps', isAvailable: true, isBestseller: true },
    { id: 'gz-03', vendorId: 'gazebo', vendorName: 'Gazebo', name: 'Paneer Wrap', description: 'Grilled paneer with mint chutney and veggies in a tortilla wrap', image: FOOD_IMAGES['wrap'], price: 90, isVeg: true, calories: 380, proteinG: 18, carbsG: 42, fatG: 16, category: 'wraps', isAvailable: true },
    { id: 'gz-04', vendorId: 'gazebo', vendorName: 'Gazebo', name: 'Chicken Nuggets (6pc)', description: 'Golden crispy chicken nuggets served with dipping sauce', image: FOOD_IMAGES['nuggets'], price: 110, isVeg: false, calories: 350, proteinG: 22, carbsG: 28, fatG: 20, category: 'snacks', isAvailable: true },
    { id: 'gz-05', vendorId: 'gazebo', vendorName: 'Gazebo', name: 'White Sauce Pasta', description: 'Creamy alfredo penne with herbs and parmesan', image: FOOD_IMAGES['pasta'], price: 130, isVeg: true, calories: 520, proteinG: 16, carbsG: 62, fatG: 24, category: 'chinese', isAvailable: true },
    { id: 'gz-06', vendorId: 'gazebo', vendorName: 'Gazebo', name: 'Chocolate Brownie', description: 'Rich fudgy chocolate brownie with walnuts', image: FOOD_IMAGES['brownie'], price: 60, isVeg: true, calories: 310, proteinG: 4, carbsG: 42, fatG: 18, category: 'desserts', isAvailable: true },

    // ─── North Square ───
    { id: 'ns-01', vendorId: 'north-square', vendorName: 'North Square', name: 'Chili Garlic Shawarma', description: 'Spicy chili garlic marinated chicken in fresh pita — campus bestseller', image: FOOD_IMAGES['shawarma'], price: 110, isVeg: false, calories: 450, proteinG: 28, carbsG: 40, fatG: 20, category: 'wraps', isAvailable: true, isBestseller: true },
    { id: 'ns-02', vendorId: 'north-square', vendorName: 'North Square', name: 'Red Sauce Pasta', description: 'Tangy tomato basil pasta with Italian herbs and olive oil', image: FOOD_IMAGES['red-pasta'], price: 100, isVeg: true, calories: 440, proteinG: 14, carbsG: 58, fatG: 18, category: 'chinese', isAvailable: true, isBestseller: true },
    { id: 'ns-03', vendorId: 'north-square', vendorName: 'North Square', name: 'Cheese Maggi', description: 'Classic Maggi loaded with melted cheese and butter', image: FOOD_IMAGES['maggi'], price: 60, isVeg: true, calories: 380, proteinG: 10, carbsG: 52, fatG: 16, category: 'chinese', isAvailable: true },
    { id: 'ns-04', vendorId: 'north-square', vendorName: 'North Square', name: 'Veg Sandwich', description: 'Grilled sandwich with veggies, cheese, and chutney', image: FOOD_IMAGES['sandwich'], price: 50, isVeg: true, calories: 280, proteinG: 12, carbsG: 35, fatG: 12, category: 'snacks', isAvailable: true },
    { id: 'ns-05', vendorId: 'north-square', vendorName: 'North Square', name: 'Bread Omelette', description: 'Fluffy egg omelette with spices, served with buttered toast', image: FOOD_IMAGES['patties'], price: 40, isVeg: false, calories: 320, proteinG: 18, carbsG: 28, fatG: 16, category: 'snacks', isAvailable: true },

    // ─── AB1 Cafe ───
    { id: 'a1-01', vendorId: 'ab1-cafe', vendorName: 'AB1 Cafe', name: 'Veg Samosa (2pc)', description: 'Crispy golden samosas with spicy potato filling', image: FOOD_IMAGES['samosa'], price: 20, isVeg: true, calories: 260, proteinG: 6, carbsG: 32, fatG: 14, category: 'snacks', isAvailable: true, isBestseller: true },
    { id: 'a1-02', vendorId: 'ab1-cafe', vendorName: 'AB1 Cafe', name: 'Masala Chai', description: 'Hot spiced tea with ginger, cardamom, and fresh milk', image: FOOD_IMAGES['tea'], price: 15, isVeg: true, calories: 90, proteinG: 3, carbsG: 14, fatG: 3, category: 'beverages', isAvailable: true },
    { id: 'a1-03', vendorId: 'ab1-cafe', vendorName: 'AB1 Cafe', name: 'Filter Coffee', description: 'Traditional South Indian filter coffee — strong and aromatic', image: FOOD_IMAGES['coffee'], price: 20, isVeg: true, calories: 80, proteinG: 2, carbsG: 12, fatG: 3, category: 'beverages', isAvailable: true },
    { id: 'a1-04', vendorId: 'ab1-cafe', vendorName: 'AB1 Cafe', name: 'Veg Patties', description: 'Crispy pastry filled with spiced vegetables', image: FOOD_IMAGES['patties'], price: 25, isVeg: true, calories: 220, proteinG: 5, carbsG: 28, fatG: 12, category: 'snacks', isAvailable: true },
    { id: 'a1-05', vendorId: 'ab1-cafe', vendorName: 'AB1 Cafe', name: 'Bread Sandwich', description: 'Simple toasted sandwich with cheese, tomato, and cucumber', image: FOOD_IMAGES['sandwich'], price: 30, isVeg: true, calories: 240, proteinG: 10, carbsG: 30, fatG: 10, category: 'snacks', isAvailable: true },

    // ─── AB2 Cafe ───
    { id: 'a2-01', vendorId: 'ab2-cafe', vendorName: 'AB2 Cafe', name: 'Masala Dosa', description: 'Crispy golden dosa with spiced potato filling, served with chutney and sambar', image: FOOD_IMAGES['dosa'], price: 50, isVeg: true, calories: 350, proteinG: 10, carbsG: 52, fatG: 12, category: 'south-indian', isAvailable: true, isBestseller: true },
    { id: 'a2-02', vendorId: 'ab2-cafe', vendorName: 'AB2 Cafe', name: 'Hakka Noodles', description: 'Stir-fried noodles with vegetables and soy sauce', image: FOOD_IMAGES['noodles'], price: 70, isVeg: true, calories: 420, proteinG: 12, carbsG: 58, fatG: 16, category: 'chinese', isAvailable: true },
    { id: 'a2-03', vendorId: 'ab2-cafe', vendorName: 'AB2 Cafe', name: 'Egg Fried Rice', description: 'Wok-tossed rice with scrambled egg, spring onions, and soy sauce', image: FOOD_IMAGES['fried-rice'], price: 80, isVeg: false, calories: 480, proteinG: 18, carbsG: 62, fatG: 18, category: 'chinese', isAvailable: true },
    { id: 'a2-04', vendorId: 'ab2-cafe', vendorName: 'AB2 Cafe', name: 'Vada Pav', description: 'Mumbai-style spiced potato fritter in a bun with chutneys', image: FOOD_IMAGES['vada-pav'], price: 25, isVeg: true, calories: 300, proteinG: 8, carbsG: 42, fatG: 14, category: 'snacks', isAvailable: true },
    { id: 'a2-05', vendorId: 'ab2-cafe', vendorName: 'AB2 Cafe', name: 'Plain Dosa', description: 'Thin crispy dosa served with coconut chutney and sambar', image: FOOD_IMAGES['dosa'], price: 35, isVeg: true, calories: 250, proteinG: 6, carbsG: 42, fatG: 8, category: 'south-indian', isAvailable: true },

    // ─── AB3 Cafe 1 ───
    { id: 'b3a-01', vendorId: 'ab3-cafe-1', vendorName: 'AB3 Cafe 1', name: 'AB3 Special Biryani', description: 'The legendary AB3 chicken biryani — campus favourite, packed with flavour', image: FOOD_IMAGES['biryani'], price: 120, isVeg: false, calories: 650, proteinG: 32, carbsG: 72, fatG: 22, category: 'biryani', isAvailable: true, isBestseller: true },
    { id: 'b3a-02', vendorId: 'ab3-cafe-1', vendorName: 'AB3 Cafe 1', name: 'AB3 Noodles', description: 'Spicy Indo-Chinese noodles tossed with veggies and sauces — another campus icon', image: FOOD_IMAGES['noodles'], price: 80, isVeg: true, calories: 440, proteinG: 12, carbsG: 60, fatG: 18, category: 'chinese', isAvailable: true, isBestseller: true },
    { id: 'b3a-03', vendorId: 'ab3-cafe-1', vendorName: 'AB3 Cafe 1', name: 'Chicken Roll', description: 'Spiced chicken strips wrapped in a flaky paratha with onions', image: FOOD_IMAGES['rolls'], price: 80, isVeg: false, calories: 400, proteinG: 24, carbsG: 40, fatG: 18, category: 'wraps', isAvailable: true },
    { id: 'b3a-04', vendorId: 'ab3-cafe-1', vendorName: 'AB3 Cafe 1', name: 'Veg Biryani', description: 'Fragrant basmati rice with mixed vegetables and biryani spices', image: FOOD_IMAGES['biryani'], price: 90, isVeg: true, calories: 520, proteinG: 14, carbsG: 68, fatG: 18, category: 'biryani', isAvailable: true },
    { id: 'b3a-05', vendorId: 'ab3-cafe-1', vendorName: 'AB3 Cafe 1', name: 'Paneer Roll', description: 'Grilled paneer with onions and spices wrapped in paratha', image: FOOD_IMAGES['rolls'], price: 70, isVeg: true, calories: 380, proteinG: 16, carbsG: 38, fatG: 18, category: 'wraps', isAvailable: true },
    { id: 'b3a-06', vendorId: 'ab3-cafe-1', vendorName: 'AB3 Cafe 1', name: 'French Fries', description: 'Golden crispy fries with peri-peri seasoning', image: FOOD_IMAGES['fries'], price: 50, isVeg: true, calories: 320, proteinG: 4, carbsG: 44, fatG: 16, category: 'snacks', isAvailable: true },

    // ─── AB3 Cafe 2 ───
    { id: 'b3b-01', vendorId: 'ab3-cafe-2', vendorName: 'AB3 Cafe 2', name: 'Grilled Veg Sandwich', description: 'Multi-layer grilled sandwich with cheese, corn, and capsicum', image: FOOD_IMAGES['sandwich'], price: 60, isVeg: true, calories: 320, proteinG: 14, carbsG: 38, fatG: 14, category: 'snacks', isAvailable: true },
    { id: 'b3b-02', vendorId: 'ab3-cafe-2', vendorName: 'AB3 Cafe 2', name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice — no sugar added', image: FOOD_IMAGES['juice'], price: 40, isVeg: true, calories: 110, proteinG: 2, carbsG: 26, fatG: 0, category: 'beverages', isAvailable: true },
    { id: 'b3b-03', vendorId: 'ab3-cafe-2', vendorName: 'AB3 Cafe 2', name: 'Butter Maggi', description: 'Classic Maggi tossed with butter and a dash of pepper', image: FOOD_IMAGES['maggi'], price: 40, isVeg: true, calories: 340, proteinG: 8, carbsG: 48, fatG: 14, category: 'chinese', isAvailable: true },
    { id: 'b3b-04', vendorId: 'ab3-cafe-2', vendorName: 'AB3 Cafe 2', name: 'Cold Coffee', description: 'Thick creamy cold coffee blended with ice cream', image: FOOD_IMAGES['cold-coffee'], price: 50, isVeg: true, calories: 220, proteinG: 6, carbsG: 32, fatG: 8, category: 'beverages', isAvailable: true, isBestseller: true },
    { id: 'b3b-05', vendorId: 'ab3-cafe-2', vendorName: 'AB3 Cafe 2', name: 'Aloo Paratha', description: 'Stuffed potato paratha served with curd and pickle', image: FOOD_IMAGES['paratha'], price: 45, isVeg: true, calories: 380, proteinG: 10, carbsG: 50, fatG: 16, category: 'south-indian', isAvailable: true },

    // ─── V Mart ───
    { id: 'vm-01', vendorId: 'vmart', vendorName: 'V Mart', name: 'Lay\'s Classic Chips', description: 'Crunchy salted potato chips — perfect study snack', image: FOOD_IMAGES['chips'], price: 20, isVeg: true, calories: 160, proteinG: 2, carbsG: 15, fatG: 10, category: 'snacks', isAvailable: true },
    { id: 'vm-02', vendorId: 'vmart', vendorName: 'V Mart', name: 'Oreo Milkshake', description: 'Thick, creamy Oreo milkshake with cookie crumble', image: FOOD_IMAGES['milkshake'], price: 60, isVeg: true, calories: 340, proteinG: 8, carbsG: 52, fatG: 14, category: 'beverages', isAvailable: true, isBestseller: true },
    { id: 'vm-03', vendorId: 'vmart', vendorName: 'V Mart', name: 'Vanilla Ice Cream Cup', description: 'Creamy vanilla ice cream in a cup — refreshing treat', image: FOOD_IMAGES['ice-cream'], price: 30, isVeg: true, calories: 200, proteinG: 4, carbsG: 24, fatG: 10, category: 'desserts', isAvailable: true },
    { id: 'vm-04', vendorId: 'vmart', vendorName: 'V Mart', name: 'Fresh Lime Soda', description: 'Sweet and salty lemon soda — ultimate refresher', image: FOOD_IMAGES['juice'], price: 25, isVeg: true, calories: 80, proteinG: 0, carbsG: 20, fatG: 0, category: 'beverages', isAvailable: true },
    { id: 'vm-05', vendorId: 'vmart', vendorName: 'V Mart', name: 'Cup Noodles', description: 'Instant cup noodles — quick fix between classes', image: FOOD_IMAGES['noodles'], price: 40, isVeg: true, calories: 290, proteinG: 6, carbsG: 40, fatG: 12, category: 'snacks', isAvailable: true },
];
