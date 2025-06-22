import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    // Verificar se o order_id existe (opcional, dependendo da lógica)
    const orderItem = this.orderItemRepository.create(createOrderItemDto);
    return this.orderItemRepository.save(orderItem);
  }

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find({
      relations: ['order'], // Removido 'user' e 'personalization' se não forem necessários
    });
  }

  async findOne(id: string): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.findOne({
      where: { id },
      relations: ['order'], // Removido 'user' e 'personalization' se não forem necessários
    });
    if (!orderItem) {
      throw new NotFoundException(`OrderItem with ID ${id} not found`);
    }
    return orderItem;
  }

  async update(
    id: string,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    const orderItem = await this.findOne(id);
    Object.assign(orderItem, updateOrderItemDto);
    return this.orderItemRepository.save(orderItem);
  }

  async remove(id: string): Promise<void> {
    const orderItem = await this.findOne(id);
    await this.orderItemRepository.remove(orderItem);
  }
}
