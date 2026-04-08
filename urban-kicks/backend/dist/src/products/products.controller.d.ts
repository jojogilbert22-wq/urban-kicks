import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(search?: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        imageUrl: string | null;
        stockQuantity: number;
        categoryId: number | null;
        supplierId: number | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        imageUrl: string | null;
        stockQuantity: number;
        categoryId: number | null;
        supplierId: number | null;
    }>;
    create(dto: CreateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        imageUrl: string | null;
        stockQuantity: number;
        categoryId: number | null;
        supplierId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdateProductDto): Promise<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        imageUrl: string | null;
        stockQuantity: number;
        categoryId: number | null;
        supplierId: number | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        imageUrl: string | null;
        stockQuantity: number;
        categoryId: number | null;
        supplierId: number | null;
    }>;
}
