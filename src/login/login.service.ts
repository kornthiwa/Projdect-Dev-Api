import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Login, LoginDocument } from './entities/login.entity';
import { CreateLoginDto } from './dto/create-login.dto';
import { Model } from 'mongoose';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Login.name) private loginModel: Model<LoginDocument>,
  ) {}

  async create(createLoginDto: CreateLoginDto): Promise<LoginDocument> {
    console.log(createLoginDto);
    const hashedPassword = await bcrypt.hash(createLoginDto.password, 10);
    const login = new this.loginModel(createLoginDto);
    login.password = hashedPassword;
    return await login.save();
  }

  async login(
    username: string,
    password: string,
  ): Promise<LoginDocument | null> {
    const login = await this.loginModel.findOne({ username });
    if (!login) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, login.password);
    return isMatch ? login : null;
  }

  findAll(): Promise<LoginDocument[]> {
    return this.loginModel.find().exec();
  }

  async findByUsername(username: string): Promise<LoginDocument | null> {
    return this.loginModel.findOne({ username }).exec();
  }

  findOne(id: number): Promise<LoginDocument | null> {
    return this.loginModel.findById(id).exec();
  }
}
