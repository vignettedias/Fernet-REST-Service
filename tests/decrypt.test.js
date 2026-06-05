const encryptionService =
require("../services/encryptionService");

describe("Decryption", () => {

  test(
    "should recover original plaintext",
    () => {

      const token =
        encryptionService.encrypt(
          "Hello Fernet"
        );

      const plaintext =
        encryptionService.decrypt(
          token
        );

      expect(plaintext)
        .toBe("Hello Fernet");

    }
  );

});