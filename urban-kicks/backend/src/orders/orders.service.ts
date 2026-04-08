import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/order.dto';

// Ghana's combined VAT + NHIL + GETFund levy rate (2026)
const GHANA_TAX_RATE = 0.20;

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreateOrderDto) {
    // Resolve customer from user
    const customer = await this.prisma.customer.findUnique({
      where: { userId },
    });
    if (!customer) throw new NotFoundException('Customer profile not found');

    // Fetch products and calculate totals
    const lineItems: Array<{
      productId: number;
      quantity: number;
      unitPrice: number;
      stockQuantity: number;
    }> = [];

    let subtotal = 0;

    for (const item of dto.items) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new BadRequestException(`Product #${item.productId} not found`);
      }
      if (product.stockQuantity < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for "${product.name}"`,
        );
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

    // Create the order and update stock in a transaction
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

      // Decrement stock
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

  findByUser(userId: number) {
    return this.prisma.order.findMany({
      where: { customer: { userId } },
      include: { orderItems: { include: { product: true } } },
      orderBy: { orderDate: 'desc' },
    });
  }

  async findOne(id: number, userId: number) {
    const order = await this.prisma.order.findFirst({
      where: { id, customer: { userId } },
      include: { orderItems: { include: { product: true } } },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
