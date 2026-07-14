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
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./repositories/user/entities/user.entity");
const business_profile_entity_1 = require("./repositories/business-profile/entities/business-profile.entity");
const lead_entity_1 = require("./repositories/lead/entities/lead.entity");
const bcrypt = __importStar(require("bcryptjs"));
const AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    url: process.env.DATABASE_URL || 'mysql://bercario_user:bercario_pass@localhost:3306/bercario',
    entities: [user_entity_1.UserEntity, business_profile_entity_1.BusinessProfileEntity, lead_entity_1.LeadEntity],
    synchronize: true,
});
async function main() {
    console.log('Iniciando semilla de base de datos con TypeORM...');
    await AppDataSource.initialize();
    await AppDataSource.query('DELETE FROM lead');
    await AppDataSource.query('DELETE FROM business_profile');
    await AppDataSource.query('DELETE FROM user');
    const mayoristaPass = await bcrypt.hash('demo1234', 10);
    const mayorista = await AppDataSource.getRepository(user_entity_1.UserEntity).save({
        email: 'mayorista@demo.co',
        password: mayoristaPass,
        name: 'Calzado La Frontera User',
        role: 'mayorista',
    });
    await AppDataSource.getRepository(business_profile_entity_1.BusinessProfileEntity).save({
        userId: mayorista.id,
        name: 'Calzado La Frontera',
        tagline: 'Zapatos de calidad directamente de Cúcuta',
        description: 'Somos fabricantes líderes en calzado para dama y caballero. Diseños exclusivos y envíos nacionales desde Norte de Santander.',
        phone: '+57 312 456 7890',
        email: 'contacto@lafrontera.co',
        address: 'Calle 10 #5-20, Barrio El Centro, Cúcuta',
        banner: '/images/company-banner.png',
        logo: '/images/company-logo.png',
        slug: 'calzado-la-frontera',
        products: [
            {
                id: 'p1',
                name: 'Mocasines Cuero Clásico',
                price: '89.900',
                image: '/images/products/shoe1.png',
                desc: 'Mocasines elegantes 100% cuero genuino, suela antideslizante.',
            },
            {
                id: 'p2',
                name: 'Tenis Deportivos Urban',
                price: '110.000',
                image: '/images/products/shoe2.png',
                desc: 'Tenis cómodos para el uso diario, materiales transpirables.',
            },
            {
                id: 'p3',
                name: 'Botas de Cuero Frontier',
                price: '145.000',
                image: '/images/products/shoe3.png',
                desc: 'Botas resistentes de alta durabilidad, ideales para todo terreno.',
            },
        ],
        testimonials: [
            {
                id: 't1',
                text: 'Excelente calidad y puntualidad en los envíos al por mayor. Muy recomendados.',
                author: 'Distribuidora Medellín',
            },
        ],
        faqs: [
            {
                id: 'f1',
                q: '¿Cuál es el pedido mínimo para mayoristas?',
                a: 'El pedido mínimo es de una docena de calzado (pueden ser surtidos en tallas y modelos).',
            },
        ],
        gallery: [
            '/images/gallery/g1.png',
            '/images/gallery/g2.png',
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
                id: 'catalog',
                type: 'catalog',
                label: 'Catálogo de productos',
                description: 'Muestra de productos con precios y descripciones.',
            },
            {
                id: 'testimonials',
                type: 'testimonials',
                label: 'Testimonios',
                description: 'Opiniones y reseñas de tus clientes.',
            },
            {
                id: 'faq',
                type: 'faq',
                label: 'Preguntas frecuentes',
                description: 'Preguntas habituales sobre envíos, pagos y pedidos.',
            },
            {
                id: 'contact',
                type: 'contact',
                label: 'Contacto',
                description: 'Formulario de contacto y datos de dirección.',
            },
        ],
    });
    const adminPass = await bcrypt.hash('admin1234', 10);
    await AppDataSource.getRepository(user_entity_1.UserEntity).save({
        email: 'admin@bercario.co',
        password: adminPass,
        name: 'Administrador Berçário',
        role: 'admin',
    });
    console.log('Semilla de base de datos completada exitosamente con TypeORM.');
    await AppDataSource.destroy();
}
main().catch((err) => {
    console.error('Error durante la siembra de base de datos:', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map