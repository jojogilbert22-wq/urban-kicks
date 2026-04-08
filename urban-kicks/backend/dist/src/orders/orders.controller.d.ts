import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(req: any, dto: CreateOrderDto): Promise<{
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
    findAll(req: any): import(".prisma/client").Prisma.PrismaPromise<({
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
    findOne(id: number, req: any): Promise<{
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
