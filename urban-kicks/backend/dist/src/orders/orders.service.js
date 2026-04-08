"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const GHANA_TAX_RATE = 0.20;
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const customer = await this.prisma.customer.findUnique({
            where: { userId },
        });
        if (!customer)
            throw new common_1.NotFoundException('Customer profile not found');
        const lineItems = [];
        let subtotal = 0;
        for (const item of dto.items) {
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId },
            });
            if (!product) {
                throw new common_1.BadRequestException(`Product #${item.productId} not found`);
            }
            if (product.stockQuantity < item.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for "${product.name}"`);
            }
            lineItems.push({
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: product.price,
                stockQuantity: product.stockQuantity,
            });
            subtotal += product.price * item.quantity;
        }
        const taxAmount = parseFloat((subtotal * GHANA_TAX_RATE).toFixed(2));
        const totalAmount = parseFloat((subtotal + taxAmount).toFixed(2));
        const order = await this.prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    customerId: customer.id,
                    totalAmount,
                    taxAmount,
                    shippingAddress: dto.shippingAddress,
                    status: 'PENDING',
                    orderItems: {
                        create: lineItems.map(({ productId, quantity, unitPrice }) => ({
                            productId,
                            quantity,
                            unitPrice,
                        })),
                    },
                },
                include: { orderItems: { include: { product: true } } },
            });
            for (const li of lineItems) {
                await tx.product.update({
                    where: { id: li.productId },
                    data: { stockQuantity: li.stockQuantity - li.quantity },
                });
            }
            return newOrder;
        });
        return order;
    }
    findByUser(userId) {
        return this.prisma.order.findMany({
            where: { customer: { userId } },
            include: { orderItems: { include: { product: true } } },
            orderBy: { orderDate: 'desc' },
        });
    }
    async findOne(id, userId) {
        const order = await this.prisma.order.findFirst({
            where: { id, customer: { userId } },
            include: { orderItems: { include: { product: true } } },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map