import {
    BelongsToMany,
    Column,
    CreatedAt,
    Model,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import {ProductsEntity} from "../products/products.entity";
import {ProductCategoryEntity} from "../products/product-category.entity";

@Table({modelName: 'hgf_categories'})
export class CategoriesEntity extends Model<CategoriesEntity> {

    @Column({
        primaryKey: true,
    })
    id: number

    @Column
    description: string

    @BelongsToMany(()=>ProductsEntity,() => ProductCategoryEntity)
    products: ProductsEntity[];

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

}