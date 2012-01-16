//
// Author:      Hoan.Trinh@vtc.vn
// Create Date: 2009.01.08
// Description: Mã hóa dữ liệu
//
using System;
using System.Text;
using System.Security.Cryptography;
using System.IO;

namespace VTCO.Utils
{
    /// <summary>
    /// Thực hiện việc mã hóa dữ liệu
    /// </summary>
    public class Encryption
    {        
        /// <summary>
        /// Mã hóa MD5 (mã hóa dữ liệu 1 chiều)
        /// </summary>
        public static string GetMD5(string input)
        {
            var x = new MD5CryptoServiceProvider();
            byte[] bs = Encoding.UTF8.GetBytes(input);
            bs = x.ComputeHash(bs);
            var s = new StringBuilder();
            foreach (byte b in bs)
            {
                s.Append(b.ToString("x2").ToLower());
            }
            return s.ToString();
        }

        /// <summary>
        /// Mã hóa MD5 - Banknetvn
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string GetMD5Hash(string input)
        {
            System.Security.Cryptography.MD5CryptoServiceProvider x = new System.Security.Cryptography.MD5CryptoServiceProvider();
            byte[] bs = System.Text.Encoding.UTF8.GetBytes(input);
            bs = x.ComputeHash(bs);
            System.Text.StringBuilder s = new System.Text.StringBuilder();
            foreach (byte b in bs)
            {
                s.Append(b.ToString("x2").ToLower());
            }
            string password = s.ToString();
            return password;
        }

        /// <summary>
        /// Mã hóa theo Base64 của một xâu
        /// Thay thế 2 ký tự '+' và '/' bằng '-' và '+'
        /// </summary>
        /// <param name="plainText"></param>
        /// <returns></returns>
        public static string ToBase64(string plainText)
        {
            byte[] arrPlainText = Encoding.UTF8.GetBytes(plainText.ToCharArray());
            string strOutput = Convert.ToBase64String(arrPlainText);
            strOutput = strOutput.Replace('+', '-');
            strOutput = strOutput.Replace('/', '_');
            return strOutput;
        }

        /// <summary>
        /// Giải mã dữ liệu Base64 của hàm trên
        /// </summary>
        /// <param name="base64Text"></param>
        /// <returns></returns>
        public static string FromBase64(string base64Text)
        {
            string strOutput = base64Text.Replace('_', '/');
            strOutput = strOutput.Replace('-', '+');

            byte[] arrOutput = Convert.FromBase64String(strOutput);

            return Encoding.UTF8.GetString(arrOutput);
        }

        /// <summary>
        /// Triples the DES encrypt.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <param name="data">The data.</param>
        /// <returns></returns>
        public static string TripleDESEncrypt(string key, string data)
        {
            data = data.Trim();

            byte[] keydata = Encoding.ASCII.GetBytes(key);

            string md5String = BitConverter.ToString(new

            MD5CryptoServiceProvider().ComputeHash(keydata)).Replace("-", "").ToLower();

            byte[] tripleDesKey = Encoding.ASCII.GetBytes(md5String.Substring(0, 24));

            TripleDES tripdes = TripleDESCryptoServiceProvider.Create();

            tripdes.Mode = CipherMode.ECB;

            tripdes.Key = tripleDesKey;

            tripdes.GenerateIV();

            MemoryStream ms = new MemoryStream();

            CryptoStream encStream = new CryptoStream(ms, tripdes.CreateEncryptor(),

                    CryptoStreamMode.Write);

            encStream.Write(Encoding.ASCII.GetBytes(data), 0, Encoding.ASCII.GetByteCount(data));

            encStream.FlushFinalBlock();

            byte[] cryptoByte = ms.ToArray();

            ms.Close();

            encStream.Close();

            return Convert.ToBase64String(cryptoByte, 0, cryptoByte.GetLength(0)).Trim();
        }

        /// <summary>
        /// Triples the DES decrypt.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <param name="data">The data.</param>
        /// <returns></returns>
        public static string TripleDESDecrypt(string key, string data)
        {
            byte[] keydata = Encoding.ASCII.GetBytes(key);

            string md5String = BitConverter.ToString(new

              MD5CryptoServiceProvider().ComputeHash(keydata)).Replace("-", "").ToLower();

            byte[] tripleDesKey = Encoding.ASCII.GetBytes(md5String.Substring(0, 24));

            TripleDES tripdes = TripleDESCryptoServiceProvider.Create();

            tripdes.Mode = CipherMode.ECB;

            tripdes.Key = tripleDesKey;

            byte[] cryptByte = Convert.FromBase64String(data);

            MemoryStream ms = new MemoryStream(cryptByte, 0, cryptByte.Length);

            ICryptoTransform cryptoTransform = tripdes.CreateDecryptor();

            CryptoStream decStream = new CryptoStream(ms, cryptoTransform,

                    CryptoStreamMode.Read);

            StreamReader read = new StreamReader(decStream);

            return (read.ReadToEnd());
        }

        public static string CreateSignRSA(string data, string privateKey)
        {
            RSACryptoServiceProvider rsaCryptoIPT = new RSACryptoServiceProvider(1024);
            rsaCryptoIPT.FromXmlString(privateKey);
            return Convert.ToBase64String(rsaCryptoIPT.SignData(new ASCIIEncoding().GetBytes(data), new SHA1CryptoServiceProvider()));
        }

        public static bool CheckSignRSA(string data, string sign, string publicKey)
        {
            RSACryptoServiceProvider rsacp = new RSACryptoServiceProvider();
            rsacp.FromXmlString(publicKey);
            return rsacp.VerifyData(Encoding.UTF8.GetBytes(data), "SHA1", Convert.FromBase64String(sign));
        }
    }
}