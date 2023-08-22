import { z } from "zod";

/**
 * This validation will return an object
 */
export class Validate {
  static email = (email = "") => {
    const emailValidationReport = {
      "valid email": false,
    };
    const schema = z.string().email().max(100);
    const validEmail = schema.safeParse(email);
    if (validEmail.success) {
      emailValidationReport["valid email"] = true;
    }
    return emailValidationReport;
  };

  static password = (password = "") => {
    const passwordValidationReport = {
      "must contain an uppercase": false,
      "must contain a lowercase": false,
      "must contain a number": false,
      "minimum length is 8 character": false,
      "must contain a symbol": false,
    };
    let toValidateCount = 5;
    for (let i = 0; i < password.length; i++) {
      const char = password[i];

      if (toValidateCount === 0) break;

      if (passwordValidationReport["must contain an uppercase"] === false) {
        if (/[A-Z]/.test(char)) {
          passwordValidationReport["must contain an uppercase"] = true;
          toValidateCount--;
          continue;
        }
      }

      if (passwordValidationReport["must contain a lowercase"] === false) {
        if (/[a-z]/.test(char)) {
          passwordValidationReport["must contain a lowercase"] = true;
          toValidateCount--;
          continue;
        }
      }

      if (passwordValidationReport["must contain a number"] === false) {
        if (/[0-9]/.test(char)) {
          passwordValidationReport["must contain a number"] = true;
          toValidateCount--;
          continue;
        }
      }

      if (passwordValidationReport["must contain a symbol"] === false) {
        if (/[^a-z0-9]/i.test(char)) {
          passwordValidationReport["must contain a symbol"] = true;
          toValidateCount--;
          continue;
        }
      }

      if (i === 7) {
        passwordValidationReport["minimum length is 8 character"] = true;
        toValidateCount--;
        continue;
      }
    }
    return passwordValidationReport;
  };

  static passwordConfirmation = (password = "", passwordConfirmation = "") => {
    const passwordConfirmationValidationReport = {
      "password confirmation is valid": false,
    };
    if (password === passwordConfirmation) {
      passwordConfirmationValidationReport["password confirmation is valid"] =
        true;
    }
    return passwordConfirmationValidationReport;
  };
}
