import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create({
      ...createProductDto,
      // images: Array.isArray(createProductDto.images)
      //   ? createProductDto.images.join(',')
      //   : createProductDto.images,
    });
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ where: { del: false } });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    product.del = true;
    await this.productRepository.save(product);
  }
}

// teste depos img //

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Product } from './entities/product.entity';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

// @Injectable()
// export class ProductsService {
//   constructor(
//     @InjectRepository(Product)
//     private readonly productRepository: Repository<Product>,
//   ) {}

//   async create(
//     productData: CreateProductDto & {
//       images: string[];
//       image_example: string;
//       cover_image: string;
//     },
//   ) {
//     const product = this.productRepository.create(productData);
//     return this.productRepository.save(product);
//   }

//   async findAll() {
//     return this.productRepository.find();
//   }

//   async findOne(id: string) {
//     const product = await this.productRepository.findOne({ where: { id } });
//     if (!product) {
//       throw new NotFoundException(`Produto com ID ${id} não encontrado`);
//     }
//     return product;
//   }

//   async update(
//     id: string,
//     updateProductDto: UpdateProductDto & {
//       images?: string[];
//       image_example?: string;
//       cover_image?: string;
//     },
//   ) {
//     const product = await this.findOne(id); // Reusa findOne para validar existência
//     const updatedProduct = this.productRepository.merge(
//       product,
//       updateProductDto,
//     );
//     return this.productRepository.save(updatedProduct);
//   }

//   async remove(id: string) {
//     const product = await this.findOne(id); // Valida existência antes de remover
//     await this.productRepository.remove(product);
//     return { message: `Produto com ID ${id} removido com sucesso` };
//   }
// }
