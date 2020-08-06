import {
    AllowNull, BelongsTo,
    Column,
    CreatedAt, ForeignKey,
    Model,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import {ProductsEntity} from "./products.entity";
import {CategoriesEntity} from "../categories/categories.entity";

@Table({modelName: 'hgf_product_category'})
export class ProductCategoryEntity extends Model<ProductCategoryEntity> {

    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number

    @AllowNull(false)
    @ForeignKey(() => ProductsEntity)
    @Column
    product_id: number;

    @AllowNull(false)
    @ForeignKey(() => CategoriesEntity)
    @Column
    category_id: number;

    @BelongsTo(() => CategoriesEntity)
    category: CategoriesEntity;

    @BelongsTo(() => ProductsEntity)
    product: ProductsEntity;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

}