export declare class CreateProductDto {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    stockQuantity?: number;
    categoryId?: number;
    supplierId?: number;
}
export declare class UpdateProductDto extends CreateProductDto {
}
