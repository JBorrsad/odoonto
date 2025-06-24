"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserCommand = void 0;
const ddd_1 = require("../../../../../../../libs/shared/ddd");
class CreateUserCommand extends ddd_1.Command {
    constructor(props) {
        super(props);
        this.email = props.email;
        this.country = props.country;
        this.postalCode = props.postalCode;
        this.street = props.street;
    }
}
exports.CreateUserCommand = CreateUserCommand;
//# sourceMappingURL=create-user.command.js.map