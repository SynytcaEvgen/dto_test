import { DynamicModule, FactoryProvider } from '@nestjs/common';
import { TypeormHelpersModuleOptions } from './interfaces/typeorm-helpers-module-options.interface';
export declare class TypeormHelpersModule {
    static register(options: TypeormHelpersModuleOptions): DynamicModule;
    static registerAsync(options: Omit<FactoryProvider<TypeormHelpersModuleOptions>, 'provide' | 'scope'>): DynamicModule;
}
