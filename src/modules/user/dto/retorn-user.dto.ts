import { User } from '../entities/user.entity';
import { UserRole } from '../../../common/enums/user-role.enum';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  role: UserRole;

  document?: string;
  phone?: string;
  address_line_1?: string;
  address_line_2?: string;
  district?: string;
  city?: string;
  state_code?: string;
  country?: string;
  postal_code?: string;
  language?: 'pt' | 'en';

  created_at: Date;
  updated_at: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;

    this.document = user.document;
    this.phone = user.phone;
    this.address_line_1 = user.address_line_1;
    this.address_line_2 = user.address_line_2;
    this.district = user.district;
    this.city = user.city;
    this.state_code = user.state_code;
    this.country = user.country;
    this.postal_code = user.postal_code;
    this.language = user.language;

    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }
}
