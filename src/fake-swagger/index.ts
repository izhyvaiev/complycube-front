function Decorator(): MethodDecorator;
function Decorator(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void;
function Decorator(...args: any[]): MethodDecorator | void {
    if (args.length === 3) {
        return;
    }

    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void {
        return;
    };
}

export {
    Decorator as ApiProperty,
    Decorator as ApiPropertyOptional,
    Decorator as ApiResponseProperty
};