import Nat8 "mo:base/Nat8";
import Debug "mo:base/Debug";
import Blob "mo:base/Blob";
import Nat "mo:base/Nat";
// The management canister's principal ID is "aaaaa-aa".
import IC "ic:aaaaa-aa";

actor {
  // Variabel untuk menyimpan angka random yang dipilih AI
  stable var aiNumber : Nat = 0;

  // Fungsi untuk AI memilih angka random antara 1 sampai 100
  public func aiPickNumber() : async Text {
    let randomBytes = await IC.raw_rand();
    if (randomBytes.size() > 0) {
      let bytes : [Nat8] = Blob.toArray(randomBytes);
      // Angka antara 1 sampai 100
      aiNumber := Nat8.toNat(bytes[0] % 100 + 1);
      return "AI sudah memilih angka. Silakan masukkan angka Anda!";
    } else {
      return "Gagal mendapatkan angka random.";
    };
  };

  // Fungsi untuk membandingkan angka pengguna dengan angka AI
  public func userGuess(userNumber : Nat) : async Text {
    if (userNumber > aiNumber) {
      return "selamat anda lebih menang";
    } else if (userNumber < aiNumber) {
      return "silakan coba lagi";
    } else {
      return "Angka sama! Seri.";
    }
  };

  // Fungsi untuk melihat angka AI (opsional, untuk debug)
  public query func getAiNumber() : async Nat {
    aiNumber
  };
}