"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const initialProfile = {
    name: 'Calzado La Frontera',
    tagline: 'Mayoristas de calzado y moda en Cúcuta',
    description: 'Somos una empresa familiar con más de 15 años surtiendo a comerciantes del Norte de Santander. Ofrecemos calzado, marroquinería y accesorios al por mayor con despacho a toda Colombia y garantía en cada pedido.',
    phone: '+57 315 482 9021',
    email: 'ventas@calzadolafrontera.co',
    address: 'Av. 5 #10-42, Centro, Cúcuta',
    banner: '/images/company-banner.png',
    logo: '/images/company-logo.png',
    slug: 'calzado-la-frontera',
    products: [
        {
            id: 'p1',
            title: 'Tenis Urbanos Blanco Arena',
            price: '$68.000',
            description: 'Par x mayor desde 12 unidades. Tallas 35-42.',
            image: '/images/product-sneakers.png',
            tags: ['#Calzado', '#Mayorista', '#Cúcuta'],
        },
        {
            id: 'p2',
            title: 'Bolso Cuero Camel',
            price: '$95.000',
            description: 'Marroquinería premium, costuras reforzadas.',
            image: '/images/product-handbag.png',
            tags: ['#Marroquinería', '#Mayorista', '#Mujer'],
        },
        {
            id: 'p3',
            title: 'Botines Cuero Café',
            price: '$120.000',
            description: 'Suela antideslizante. Ideal temporada fría.',
            image: '/images/product-boots.png',
            tags: ['#Calzado', '#Cuero', '#Unisex'],
        },
        {
            id: 'p4',
            title: 'Suéter Tejido Beige',
            price: '$54.000',
            description: 'Docena surtida en tallas. Tela térmica.',
            image: '/images/product-jacket.png',
            tags: ['#Textil', '#Mayorista', '#Invierno'],
        },
        {
            id: 'p5',
            title: 'Reloj Correa Cuero',
            price: '$78.000',
            description: 'Accesorio unisex, empaque individual.',
            image: '/images/product-watch.png',
            tags: ['#Accesorios', '#Mayorista', '#Regalo'],
        },
    ],
    testimonials: [
        {
            id: 't1',
            name: 'Marisol Peña',
            role: 'Tienda El Buen Precio · Pamplona',
            quote: 'Desde que compro con ellos mis márgenes mejoraron. Los despachos llegan completos y a tiempo.',
            rating: 5,
        },
        {
            id: 't2',
            name: 'Jorge Ramírez',
            role: 'Distribuidora JR · Ocaña',
            quote: 'Excelente calidad al por mayor. El catálogo en línea me facilita hacer pedidos desde el celular.',
            rating: 5,
        },
        {
            id: 't3',
            name: 'Diana Vega',
            role: 'Almacén La Moda · Cúcuta',
            quote: 'Atención cercana y precios justos. Llevo dos años surtiendo mi almacén con ellos.',
            rating: 4,
        },
    ],
    faqs: [
        {
            id: 'f1',
            question: '¿Cuál es el pedido mínimo al por mayor?',
            answer: 'El pedido mínimo es de 12 unidades por referencia. Para docenas surtidas consulta disponibilidad con nuestro equipo.',
        },
        {
            id: 'f2',
            question: '¿Hacen despachos a todo el país?',
            answer: 'Sí, despachamos a toda Colombia a través de transportadoras aliadas. El costo de envío depende de la ciudad de destino.',
        },
        {
            id: 'f3',
            question: '¿Qué métodos de pago aceptan?',
            answer: 'Aceptamos transferencia, consignación y pago contra entrega en Cúcuta. Próximamente pagos en línea desde tu perfil.',
        },
    ],
    gallery: [
        '/images/company-banner.png',
        '/images/hero.png',
        '/images/product-sneakers.png',
        '/images/product-handbag.png',
        '/images/product-boots.png',
        '/images/product-watch.png',
    ],
    sections: [
        {
            id: 'banner',
            type: 'banner',
            label: 'Banner principal',
            description: 'Imagen destacada, logo y nombre del negocio.',
        },
        {
            id: 'about',
            type: 'about',
            label: 'Quiénes somos',
            description: 'Descripción y propuesta de valor del negocio.',
        },
        {
            id: 'products',
            type: 'products',
            label: 'Catálogo de productos',
            description: 'Grilla de productos con precios y etiquetas.',
        },
        {
            id: 'contact',
            type: 'contact',
            label: 'Formulario de contacto',
            description: 'Datos de contacto y formulario para clientes.',
        },
    ]
};
async function main() {
    const email = 'mayorista@demo.co';
    const plainPassword = 'demo1234';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    await prisma.businessProfile.deleteMany().catch(() => { });
    await prisma.user.deleteMany().catch(() => { });
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name: 'Calzado La Frontera User',
            role: 'mayorista',
        },
    });
    await prisma.businessProfile.create({
        data: {
            userId: user.id,
            name: initialProfile.name,
            tagline: initialProfile.tagline,
            description: initialProfile.description,
            phone: initialProfile.phone,
            email: initialProfile.email,
            address: initialProfile.address,
            banner: initialProfile.banner,
            logo: initialProfile.logo,
            slug: initialProfile.slug,
            products: initialProfile.products,
            testimonials: initialProfile.testimonials,
            faqs: initialProfile.faqs,
            gallery: initialProfile.gallery,
            sections: initialProfile.sections,
        },
    });
    console.log('Semilla de base de datos completada exitosamente.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map