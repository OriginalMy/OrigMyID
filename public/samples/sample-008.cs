using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace TestCrypto
{
   class MainClass
   {

       public static void Main(string[] args)
       {
           Console.Write(DecryptCrypt7(CRYPTOGRAPHY_KEY,IV));
       }

       public static string DecryptCrypt7(string data, string keyString, string ivString)
       {

           byte[] key = Encoding.ASCII.GetBytes(keyString);
           byte[] iv = Encoding.ASCII.GetBytes(ivString);

           using (var rijndaelManaged =
                   new RijndaelManaged { Key = key, IV = iv, Mode = CipherMode.CBC })
           {
               rijndaelManaged.BlockSize = 128;
               rijndaelManaged.KeySize = 256;
               using (var memoryStream =
                      new MemoryStream(Convert.FromBase64String(data)))
               using (var cryptoStream =
                      new CryptoStream(memoryStream,
                          rijndaelManaged.CreateDecryptor(key, iv),
                          CryptoStreamMode.Read))
               {
                   return new StreamReader(cryptoStream).ReadToEnd();
               }
           }
       }

   }
}