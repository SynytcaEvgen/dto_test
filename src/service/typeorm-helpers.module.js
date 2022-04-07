"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TypeormHelpersModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_helper_service_1 = require("./typeorm-helper.service");
const tokens_1 = require("./tokens");
let TypeormHelpersModule = TypeormHelpersModule_1 = class TypeormHelpersModule {
    static register(options) {
        return {
            module: TypeormHelpersModule_1,
            global: true,
            providers: [
                {
                    provide: typeorm_helper_service_1.TypeormHelper,
                    useFactory: () => new typeorm_helper_service_1.TypeormHelper(options.connection),
                },
            ],
            exports: [typeorm_helper_service_1.TypeormHelper],
        };
    }
    static registerAsync(options) {
        return {
            module: TypeormHelpersModule_1,
            global: true,
            providers: [
                {
                    provide: tokens_1.TYPEORM_HELPER_MODULE_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject,
                },
                {
                    provide: typeorm_helper_service_1.TypeormHelper,
                    useFactory: (options) => new typeorm_helper_service_1.TypeormHelper(options.connection),
                    inject: [tokens_1.TYPEORM_HELPER_MODULE_OPTIONS],
                },
            ],
            exports: [typeorm_helper_service_1.TypeormHelper],
        };
    }
};
TypeormHelpersModule = TypeormHelpersModule_1 = __decorate([
    common_1.Module({
        providers: [typeorm_helper_service_1.TypeormHelper],
        exports: [typeorm_helper_service_1.TypeormHelper],
    })
], TypeormHelpersModule);
exports.TypeormHelpersModule = TypeormHelpersModule;
//# sourceMappingURL=typeorm-helpers.module.js.map