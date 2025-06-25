import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({name: 'customPass', async: false})
export class CustomPassword implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        // const obj = args.object as any
        // return obj.password === obj.confirm_password
        return args.object['password'] === args.object['confirmPassword']
    }
    defaultMessage(value: ValidationArguments)  {
        return "Password and confirm password should be same"
    }
}