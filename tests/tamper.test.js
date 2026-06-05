const encryptionService =
require("../services/encryptionService");

describe("Tamper Detection", () => {

  test(
    "should reject modified tokens",
    () => {

      const token =
        encryptionService.encrypt(
          "Sensitive Data"
        );

      const tampered =
        token.slice(0,-1) + "X";

      expect(() => {

        encryptionService.decrypt(
          tampered
        );

      }).toThrow();

    }
  );

});