const encryptionService =
require("../services/encryptionService");

describe(
  "Canonical Base64URL Validation",
  () => {

    test(
      "should reject non-canonical token representations",
      () => {

        const token =
          encryptionService.encrypt(
            "Hello Fernet"
          );

        const modifiedToken =
          token + "A";

        expect(() => {

          encryptionService.decrypt(
            modifiedToken
          );

        }).toThrow();

      }
    );

  }
);