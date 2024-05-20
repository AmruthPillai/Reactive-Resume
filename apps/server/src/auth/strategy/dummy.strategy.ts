import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport";

@Injectable()
export class DummyStrategy extends PassportStrategy(Strategy, "dummy") {
  authenticate() {
    this.fail();
  }
}
