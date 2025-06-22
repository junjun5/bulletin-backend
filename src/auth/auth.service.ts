// (1) 必要なライブラリをインポートする
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; 
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User as UserModel } from 'generated/prisma';

// (2) AuthServiceクラス
@Injectable()
export class AuthService {
  // (3) コンストラクタの設定
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, 10);
  }
  // (4) validateUserメソッド：与えられたメールアドレスやパスワードを使ってユーザを検証。
  async validateUser(email: string, password_hash: string): Promise<any> {
    console.log(email, password_hash)
    if (!email || !password_hash) {
      return null;
    }
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.password_hash) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password_hash, user.password_hash);
    if (isPasswordValid) {
      return user;
    }
    return null;
  }

  // (5) loginメソッド：与えられたユーザオブジェクトからJWTトークンを生成する。
  async login(email: string, password_hash: string): Promise<{access_token: string}> {
    console.log('Login attempt with:', { email, password_hash });
    const user = await this.prisma.user.findUnique({ where: { email } });
    console.log('Found user:', user);
    if (!user || !user.password_hash) {
      console.log('User or password_hash is null/undefined');
      throw new UnauthorizedException();
    }
    const isPasswordValid = await bcrypt.compare(password_hash, user.password_hash);
    if (isPasswordValid) {
      const payload = { sub: user.id, username: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}