const encryptionService =
require("../services/encryptionService");

describe("TTL Validation", () => {

  test(
    "should reject expired token",
    () => {

      const key =
        encryptionService.generateKey();

      const oldTimestamp =
        encryptionService.currentUnixSeconds()
        - 120;

      const expiredToken =
        encryptionService.rawEncrypt(
          "expired",
          key,
          {
            timestamp: oldTimestamp
          }
        );

      expect(() => {

        encryptionService.rawDecrypt(
          expiredToken,
          key,
          {
            ttl: 60
          }
        );

      }).toThrow(
        /expired/i
      );

    }
  );

});