import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  create(dto: CreateProductDto) {
    const product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: string) {
    return this.productRepo.findOne({ where: { id } });
  }

  async update(id: string, dto: Partial<CreateProductDto>) {
    await this.productRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return this.productRepo.remove(product);
  }
}
