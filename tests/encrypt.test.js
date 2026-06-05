const encryptionService =
require("../services/encryptionService");

describe("Encryption", () => {

  test(
    "should generate a Fernet token",
    () => {

      const token =
        encryptionService.encrypt(
          "Hello Fernet"
        );

      expect(token)
        .toBeDefined();

      expect(typeof token)
        .toBe("string");

    }
  );

});