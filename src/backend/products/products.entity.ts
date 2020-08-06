import {
    BelongsToMany,
    Column,
    CreatedAt, DataType,
    Model,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import {CategoriesEntity} from "../categories/categories.entity";
import {ProductCategoryEntity} from "./product-category.entity";

@Table({modelName: 'hgf_products'})
export class ProductsEntity extends Model<ProductsEntity> {

    @Column({
        primaryKey: true,
    })
    id: number

    @Column
    product_type_id: number

    @Column
    description: string

    @Column
    ean: string

    @Column
    image_path: string

    @Column(DataType.TEXT)
    image_base64: string

    @Column(DataType.DOUBLE)
    price: number

    @Column(DataType.DOUBLE)
    price_cd: number

    @Column(DataType.DOUBLE)
    price_cc: number

    @Column(DataType.DOUBLE)
    price_pz: number

    @Column
    status: number

    @BelongsToMany(() => CategoriesEntity, () => ProductCategoryEntity)
    category: CategoriesEntity[];

    @Column
    points: number

    @Column
    points_price: number

    @Column
    date_added: string

    @Column
    date_modified: string

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

}