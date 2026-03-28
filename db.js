const APP_DATA = {
    categories: [
        { id: 'all', name: 'All', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
        { id: 'omelette', name: 'Omelette', image: 'https://images.unsplash.com/photo-1510693042738-eb4f10885d81?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
        { id: 'salad', name: 'Salad', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
        { id: 'chicken', name: 'Chicken', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
        { id: 'chaap', name: 'Chaap', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
        { id: 'burger', name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }
    ],

    restaurants: [
        {
            id: 'r1',
            name: 'Arun Vilas Food',
            rating: 4.1,
            reviews: '400+',
            time: '25-30 mins',
            distance: '2.6 km',
            offer: '50% OFF up to ₹100',
            tags: ['Chinese', '₹250 for one'],
            cover: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            menu: [
                {
                    id: 'm1',
                    name: 'Special Chicken Biryani',
                    desc: 'A tantalizing blend of flavors, this chicken starter will leave you wanting more.',
                    price: 250,
                    veg: false,
                    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    isHighProtein: true,
                    nutrition: { kcal: 540, protein: '42g', fat: '28g', carbs: '35g', fibre: '3g' }
                },
                {
                    id: 'm2',
                    name: 'Egg Podimas 250Ml',
                    desc: 'Delicious scrambled eggs with Indian spices.',
                    price: 130,
                    veg: false,
                    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    isHighProtein: true,
                    nutrition: { kcal: 355, protein: '23g', fat: '20g', carbs: '8g', fibre: '1g' }
                }
            ]
        },
        {
            id: 'r2',
            name: 'Ranji\'s Home Food',
            rating: 4.5,
            reviews: '1.2k+',
            time: '20-25 mins',
            distance: '1.8 km',
            offer: 'Free Delivery',
            tags: ['North Indian', 'Healthy', '₹200 for one'],
            cover: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            menu: [
                {
                    id: 'm3',
                    name: 'Chicken Shorba (600gms)',
                    desc: 'Healthy, slow-cooked clear chicken soup.',
                    price: 239,
                    veg: false,
                    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    isHighProtein: true,
                    nutrition: { kcal: 210, protein: '25g', fat: '8g', carbs: '5g', fibre: '0g' }
                },
                {
                    id: 'm4',
                    name: 'Ginger Chicken [400 ml]',
                    desc: 'A tantalizing blend of flavors, this ginger infused chicken starter...',
                    price: 290,
                    veg: false,
                    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    isHighProtein: true,
                    nutrition: { kcal: 493, protein: '38g', fat: '27g', carbs: '24g', fibre: '4g' }
                }
            ]
        },
        {
            id: 'r3',
            name: 'Burger King',
            rating: 4.3,
            reviews: '10k+',
            time: '15-20 mins',
            distance: '3.0 km',
            offer: 'Steal Deal @ ₹156',
            tags: ['American', 'Fast Food', '₹300 for one'],
            cover: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            menu: [
                {
                    id: 'm5',
                    name: 'Crispy Chicken Burger Peri Peri Meal',
                    desc: 'Spicy chicken patty meal with peri peri fries.',
                    price: 312,
                    veg: false,
                    originalPrice: 625,
                    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    isHighProtein: false,
                    nutrition: { kcal: 850, protein: '25g', fat: '45g', carbs: '90g', fibre: '6g' }
                },
                {
                    id: 'm6',
                    name: 'Crispy Veg Double Patty',
                    desc: 'Double veg patty for double fun.',
                    price: 99,
                    originalPrice: 149,
                    veg: true,
                    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    isHighProtein: false,
                    nutrition: null
                }
            ]
        }
    ]
};
