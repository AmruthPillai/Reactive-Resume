import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

type GenericCallback = (err: Error | null, user: any) => void

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: GenericCallback): any {
    done(null, user);
  }
  deserializeUser(payload: any, done: GenericCallback): any {
    done(null, payload);
  }
}
