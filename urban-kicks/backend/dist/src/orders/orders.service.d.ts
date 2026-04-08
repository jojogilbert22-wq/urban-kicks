import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/order.dto';
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: CreateOrderDto): Promise<{
        orderItems: ({
            product: {
                id: number;
                name: string;
                description: string | null;
                price: number;
                imageUrl: string | null;
                stockQuantity: number;
                categoryId: number | null;
                supplierId: number | null;
            };
        } & {
            id: number;
            productId: number;
            quantity: number;
            unitPrice: number;
            orderId: number;
        })[];
    } & {
        id: number;
        shippingAddress: string | null;
        orderDate: Date;
        totalAmount: number;
        taxAmount: number;
        status: string;
        paymentId: string | null;
        customerId: number;
    }>;
    findByUser(userId: number): import(".prisma/client").Prisma.PrismaPromise<({
        orderItems: ({
            product: {
                id: number;
                name: string;
                description: string | null;
                price: number;
                imageUrl: string | null;
                stockQuantity: number;
                categoryId: number | null;
                supplierId: number | null;
            };
        } & {
            id: number;
            productId: number;
            quantity: number;
            unitPrice: number;
            orderId: number;
        })[];
    } & {
        id: number;
        shippingAddress: string | null;
        orderDate: Date;
        totalAmount: number;
        taxAmount: number;
        status: string;
        paymentId: string | null;
        customerId: number;
    })[]>;
    findOne(id: number, userId: number): Promise<{
        orderItems: ({
            product: {
                id: number;
                name: string;
                description: string | null;
                price: number;
                imageUrl: string | null;
                stockQuantity: number;
                categoryId: number | null;
                supplierId: number | null;
            };
        } & {
            id: number;
            productId: number;
            quantity: number;
            unitPrice: number;
            orderId: number;
        })[];
    } & {
        id: number;
        shippingAddress: string | null;
        orderDate: Date;
        totalAmount: number;
        taxAmount: number;
        status: string;
        paymentId: string | null;
        customerId: number;
    }>;
}
